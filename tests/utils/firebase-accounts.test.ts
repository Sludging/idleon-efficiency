import {
    ACCOUNTS_STORAGE_KEY,
    ACTIVE_ACCOUNT_STORAGE_KEY,
    DEFAULT_FIREBASE_APP_NAME,
    clearAccountRegistry,
    createAccountSlot,
    getActiveAccount,
    getActiveAccountId,
    getActiveAccountUid,
    loadSavedAccounts,
    readScopedCompanions,
    registerAccount,
    registerExistingDefaultAccount,
    removeAccountFromRegistry,
    setActiveAccountId,
    updateAccountLabel,
    writeScopedCompanions,
} from '../../data/firebase/accounts';

describe('Firebase multi-account registry', () => {
    let storage: Map<string, string>;

    beforeEach(() => {
        storage = new Map<string, string>();
        (localStorage.getItem as jest.Mock).mockImplementation((key: string) => storage.get(key) ?? null);
        (localStorage.setItem as jest.Mock).mockImplementation((key: string, value: string) => {
            storage.set(key, value);
        });
        (localStorage.removeItem as jest.Mock).mockImplementation((key: string) => {
            storage.delete(key);
        });
        (localStorage.clear as jest.Mock).mockImplementation(() => {
            storage.clear();
        });
    });

    it('migrates an existing default Firebase account into the registry', () => {
        const result = registerExistingDefaultAccount('uid-main');

        expect(result.accounts).toEqual([
            { id: 'default', appName: DEFAULT_FIREBASE_APP_NAME, uid: 'uid-main' },
        ]);
        expect(result.activeAccount.id).toBe('default');
        expect(getActiveAccountId()).toBe('default');
        expect(getActiveAccountUid()).toBe('uid-main');
    });

    it('registers multiple distinct accounts and deduplicates repeated uids', () => {
        const firstSlot = createAccountSlot();
        const secondSlot = createAccountSlot();
        const duplicateSlot = createAccountSlot();

        const first = registerAccount(firstSlot, 'uid-1');
        expect(first.isDuplicate).toBe(false);
        expect(first.accounts).toHaveLength(1);
        expect(getActiveAccountId()).toBe(firstSlot.id);

        const second = registerAccount(secondSlot, 'uid-2');
        expect(second.isDuplicate).toBe(false);
        expect(second.accounts).toHaveLength(2);
        expect(getActiveAccountId()).toBe(secondSlot.id);

        // Signing into uid-1 again reuses its existing slot and marks it active.
        const duplicate = registerAccount(duplicateSlot, 'uid-1');
        expect(duplicate.isDuplicate).toBe(true);
        expect(duplicate.accounts).toHaveLength(2);
        expect(duplicate.activeAccount.id).toBe(firstSlot.id);
        expect(getActiveAccountId()).toBe(firstSlot.id);
    });

    it('updates first character name labels for matching uids', () => {
        registerExistingDefaultAccount('uid-1');
        const slot2 = createAccountSlot();
        registerAccount(slot2, 'uid-2');

        updateAccountLabel('uid-1', 'MainHero');
        updateAccountLabel('uid-2', 'AltMage');

        const accounts = loadSavedAccounts();
        expect(accounts.find((account) => account.uid === 'uid-1')?.firstCharName).toBe('MainHero');
        expect(accounts.find((account) => account.uid === 'uid-2')?.firstCharName).toBe('AltMage');
    });

    it('switches active account when removing the currently active account', () => {
        registerExistingDefaultAccount('uid-1');
        const slot2 = createAccountSlot();
        registerAccount(slot2, 'uid-2');

        expect(getActiveAccountId()).toBe(slot2.id);

        const afterRemoveActive = removeAccountFromRegistry(slot2.id);
        expect(afterRemoveActive.accounts).toHaveLength(1);
        expect(afterRemoveActive.nextActiveAccountId).toBe('default');
        expect(getActiveAccount()?.uid).toBe('uid-1');

        const afterRemoveLast = removeAccountFromRegistry('default');
        expect(afterRemoveLast.accounts).toHaveLength(0);
        expect(afterRemoveLast.nextActiveAccountId).toBeNull();
        expect(storage.has(ACCOUNTS_STORAGE_KEY)).toBe(false);
        expect(storage.has(ACTIVE_ACCOUNT_STORAGE_KEY)).toBe(false);
    });

    it('keeps active account unchanged when removing an inactive account', () => {
        registerExistingDefaultAccount('uid-1');
        const slot2 = createAccountSlot();
        registerAccount(slot2, 'uid-2');

        const result = removeAccountFromRegistry('default');
        expect(result.accounts).toHaveLength(1);
        expect(result.nextActiveAccountId).toBe(slot2.id);
        expect(getActiveAccount()?.uid).toBe('uid-2');
    });

    it('handles corrupt localStorage gracefully and clears registry completely', () => {
        storage.set(ACCOUNTS_STORAGE_KEY, '{not-json');
        expect(loadSavedAccounts()).toEqual([]);

        registerExistingDefaultAccount('uid-1');
        clearAccountRegistry();
        expect(loadSavedAccounts()).toEqual([]);
        expect(getActiveAccountId()).toBeNull();
    });

    it('scopes companion overrides per account without leaking legacy data to a second account', () => {
        storage.set('companions', '[{"id":1,"owned":true}]');

        // Single account falls back to legacy key so existing overrides are preserved.
        registerExistingDefaultAccount('uid-1');
        expect(readScopedCompanions()).toBe('[{"id":1,"owned":true}]');

        // Adding a second account does not inherit uid-1's legacy global overrides.
        const slot2 = createAccountSlot();
        registerAccount(slot2, 'uid-2');
        expect(readScopedCompanions()).toBeNull();

        // Saving overrides writes under the active uid and removes the legacy global key.
        writeScopedCompanions('[{"id":2,"owned":true}]');
        expect(storage.get('uid-2/companions')).toBe('[{"id":2,"owned":true}]');
        expect(storage.has('companions')).toBe(false);

        // Switching back to uid-1 reads its own scoped storage independently.
        setActiveAccountId('default');
        expect(readScopedCompanions()).toBeNull();
        writeScopedCompanions('[{"id":3,"owned":true}]');
        expect(storage.get('uid-1/companions')).toBe('[{"id":3,"owned":true}]');
        expect(storage.get('uid-2/companions')).toBe('[{"id":2,"owned":true}]');
    });
});
