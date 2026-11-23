import { deleteApp, FirebaseApp, getApps, initializeApp } from 'firebase/app';
import defaultApp, { firebaseConfig } from './config';

export const DEFAULT_FIREBASE_APP_NAME = '[DEFAULT]';
export const ACCOUNTS_STORAGE_KEY = 'idleon_efficiency_accounts';
export const ACTIVE_ACCOUNT_STORAGE_KEY = 'idleon_efficiency_active_account';
const LEGACY_COMPANIONS_KEY = 'companions';

export type SavedAccount = {
    id: string;
    appName: string;
    uid: string;
    firstCharName?: string;
};

export type AccountSlot = {
    id: string;
    appName: string;
};

const hasLocalStorage = (): boolean => {
    return typeof localStorage !== 'undefined';
};

const isValidSavedAccount = (value: unknown): value is SavedAccount => {
    if (!value || typeof value !== 'object') {
        return false;
    }

    const candidate = value as Record<string, unknown>;
    return (
        typeof candidate.id === 'string' &&
        candidate.id.length > 0 &&
        typeof candidate.appName === 'string' &&
        candidate.appName.length > 0 &&
        typeof candidate.uid === 'string' &&
        candidate.uid.length > 0 &&
        (candidate.firstCharName === undefined || typeof candidate.firstCharName === 'string')
    );
};

export const loadSavedAccounts = (): SavedAccount[] => {
    if (!hasLocalStorage()) {
        return [];
    }

    try {
        const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
        if (!raw) {
            return [];
        }

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.filter(isValidSavedAccount);
    } catch {
        return [];
    }
};

export const saveAccounts = (accounts: SavedAccount[]): void => {
    if (!hasLocalStorage()) {
        return;
    }

    if (accounts.length === 0) {
        localStorage.removeItem(ACCOUNTS_STORAGE_KEY);
        return;
    }

    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
};

export const getActiveAccountId = (): string | null => {
    if (!hasLocalStorage()) {
        return null;
    }

    return localStorage.getItem(ACTIVE_ACCOUNT_STORAGE_KEY) || null;
};

export const setActiveAccountId = (accountId: string | null): void => {
    if (!hasLocalStorage()) {
        return;
    }

    if (!accountId) {
        localStorage.removeItem(ACTIVE_ACCOUNT_STORAGE_KEY);
        return;
    }

    localStorage.setItem(ACTIVE_ACCOUNT_STORAGE_KEY, accountId);
};

export const getActiveAccount = (): SavedAccount | undefined => {
    const accounts = loadSavedAccounts();
    if (accounts.length === 0) {
        return undefined;
    }

    const activeId = getActiveAccountId();
    if (activeId) {
        const matchingAccount = accounts.find((account) => account.id === activeId);
        if (matchingAccount) {
            return matchingAccount;
        }
    }

    return accounts[0];
};

export const getActiveAccountUid = (): string | undefined => {
    return getActiveAccount()?.uid;
};

export const createAccountSlot = (): AccountSlot => {
    const uniqueId = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    return {
        id: uniqueId,
        appName: `account-${uniqueId}`,
    };
};

export const registerAccount = (
    slot: AccountSlot,
    uid: string,
): { accounts: SavedAccount[]; activeAccount: SavedAccount; isDuplicate: boolean } => {
    const accounts = loadSavedAccounts();
    const existingAccount = accounts.find((account) => account.uid === uid);

    if (existingAccount) {
        setActiveAccountId(existingAccount.id);
        return {
            accounts,
            activeAccount: existingAccount,
            isDuplicate: true,
        };
    }

    const newAccount: SavedAccount = {
        id: slot.id,
        appName: slot.appName,
        uid,
    };
    const updatedAccounts = [...accounts, newAccount];
    saveAccounts(updatedAccounts);
    setActiveAccountId(newAccount.id);

    return {
        accounts: updatedAccounts,
        activeAccount: newAccount,
        isDuplicate: false,
    };
};

// Migrates an existing single-account session on the default Firebase app into the registry.
export const registerExistingDefaultAccount = (
    uid: string,
): { accounts: SavedAccount[]; activeAccount: SavedAccount } => {
    const { accounts, activeAccount } = registerAccount(
        { id: 'default', appName: DEFAULT_FIREBASE_APP_NAME },
        uid,
    );

    return { accounts, activeAccount };
};

export const updateAccountLabel = (uid: string, firstCharName: string): SavedAccount[] => {
    const trimmedName = firstCharName.trim();
    const accounts = loadSavedAccounts();
    if (!trimmedName || accounts.length === 0) {
        return accounts;
    }

    let changed = false;
    const updatedAccounts = accounts.map((account) => {
        if (account.uid === uid && account.firstCharName !== trimmedName) {
            changed = true;
            return { ...account, firstCharName: trimmedName };
        }
        return account;
    });

    if (changed) {
        saveAccounts(updatedAccounts);
    }

    return updatedAccounts;
};

export const removeAccountFromRegistry = (
    accountId: string,
): { accounts: SavedAccount[]; nextActiveAccountId: string | null } => {
    const accounts = loadSavedAccounts();
    const remainingAccounts = accounts.filter((account) => account.id !== accountId);
    saveAccounts(remainingAccounts);

    const currentActiveId = getActiveAccountId();
    const nextActiveAccountId = currentActiveId === accountId
        ? (remainingAccounts[0]?.id ?? null)
        : currentActiveId;

    setActiveAccountId(nextActiveAccountId);

    return {
        accounts: remainingAccounts,
        nextActiveAccountId,
    };
};

export const clearAccountRegistry = (): void => {
    if (!hasLocalStorage()) {
        return;
    }

    localStorage.removeItem(ACCOUNTS_STORAGE_KEY);
    localStorage.removeItem(ACTIVE_ACCOUNT_STORAGE_KEY);
};

export const getAccountFirebaseApp = (appName: string): FirebaseApp => {
    if (appName === DEFAULT_FIREBASE_APP_NAME) {
        return defaultApp;
    }

    const existingApp = getApps().find((candidate) => candidate.name === appName);
    if (existingApp) {
        return existingApp;
    }

    return initializeApp(firebaseConfig, appName);
};

export const getActiveFirebaseApp = (): FirebaseApp => {
    if (typeof window === 'undefined') {
        return defaultApp;
    }

    const activeAccount = getActiveAccount();
    return getAccountFirebaseApp(activeAccount?.appName ?? DEFAULT_FIREBASE_APP_NAME);
};

export const deleteAccountFirebaseApp = async (appName: string): Promise<void> => {
    if (appName === DEFAULT_FIREBASE_APP_NAME) {
        return;
    }

    const existingApp = getApps().find((candidate) => candidate.name === appName);
    if (existingApp) {
        await deleteApp(existingApp);
    }
};

export const readScopedCompanions = (uid?: string): string | null => {
    if (!hasLocalStorage()) {
        return null;
    }

    const resolvedUid = uid ?? getActiveAccountUid();
    if (resolvedUid) {
        const scopedValue = localStorage.getItem(`${resolvedUid}/${LEGACY_COMPANIONS_KEY}`);
        if (scopedValue !== null && scopedValue !== undefined) {
            return scopedValue;
        }

        // Only fall back to the legacy global key when the user has a single account.
        if (loadSavedAccounts().length <= 1) {
            return localStorage.getItem(LEGACY_COMPANIONS_KEY);
        }

        return null;
    }

    return localStorage.getItem(LEGACY_COMPANIONS_KEY);
};

export const writeScopedCompanions = (serializedCompanions: string, uid?: string): void => {
    if (!hasLocalStorage()) {
        return;
    }

    const resolvedUid = uid ?? getActiveAccountUid();
    if (resolvedUid) {
        localStorage.setItem(`${resolvedUid}/${LEGACY_COMPANIONS_KEY}`, serializedCompanions);
        localStorage.removeItem(LEGACY_COMPANIONS_KEY);
        return;
    }

    localStorage.setItem(LEGACY_COMPANIONS_KEY, serializedCompanions);
};
