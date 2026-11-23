import {
    Auth,
    EmailAuthProvider,
    GoogleAuthProvider,
    OAuthProvider,
    User,
    getAuth,
    signInWithCredential,
    signInWithCustomToken,
    signOut,
} from 'firebase/auth'
import { createStore } from 'zustand/vanilla'
import { AuthStatus } from '../../data/firebase/authContext'
import {
    DEFAULT_FIREBASE_APP_NAME,
    SavedAccount,
    clearAccountRegistry,
    createAccountSlot,
    deleteAccountFirebaseApp,
    getAccountFirebaseApp,
    getActiveAccount,
    getActiveFirebaseApp,
    loadSavedAccounts,
    registerAccount,
    registerExistingDefaultAccount,
    removeAccountFromRegistry,
    setActiveAccountId,
} from '../../data/firebase/accounts'
import { loginEvent, sendEvent } from '../gtag'
import { AppleLogin } from '../../data/domain/login/appleLogin'
import { isSubDomain } from '../../data/utility'
import { hashEmailForAds } from '../hashEmail'
import {
    clearNitroHashedEmail,
    isNitroHashedEmailOptedOut,
    setNitroHashedEmail,
} from '../nitroHashedEmailConsent'

export type LoginOptions = {
    addAccount?: boolean
}

export type AuthState = {
    // Marks whether initial auth state restoration has run.
    initialized: boolean
    user?: User
    authStatus: AuthStatus
    errorCode?: string
    accounts: SavedAccount[]
    activeAccountId: string | null
}

export type AuthActions = {
    logout: () => Promise<void>
    logoutAll: () => Promise<void>
    switchAccount: (accountId: string) => void
    removeAccount: (accountId: string) => Promise<void>
    googleLogin: (id_token: string, options?: LoginOptions) => Promise<boolean>
    emailLogin: (email: string, password: string, options?: LoginOptions) => Promise<boolean>
    uglySteamLogin: (redirectUrl: string, options?: LoginOptions) => Promise<boolean>
    appleLogin: (options?: LoginOptions) => Promise<boolean>
    clearError: () => void
    initialize: () => Promise<void>
}

export type AuthStore = AuthState & AuthActions

const reloadPage = () => {
    if (typeof window !== 'undefined') {
        window.location.reload();
    }
}

export const initAuthStore = async (): Promise<Partial<AuthState>> => {
    if (isSubDomain()) {
        return {
            authStatus: AuthStatus.NoUser,
            accounts: [],
            activeAccountId: null,
        }
    }

    const auth = getAuth(getActiveFirebaseApp());
    await auth.authStateReady();

    if (auth.currentUser) {
        const activeAccount = getActiveAccount();
        return {
            user: auth.currentUser,
            authStatus: AuthStatus.Valid,
            accounts: loadSavedAccounts(),
            activeAccountId: activeAccount?.id ?? null,
        }
    }

    return {
        user: undefined,
        authStatus: AuthStatus.NoUser,
        accounts: loadSavedAccounts(),
        activeAccountId: null,
    }
}

export const defaultInitState: AuthState = {
    authStatus: AuthStatus.Loading,
    initialized: false,
    accounts: [],
    activeAccountId: null,
}

// Expose a hashed user email through localStorage.
// This is used only by Nitro to display targeted ads.
const syncNitroHashedEmail = async (user?: User): Promise<void> => {
    if (!user?.email || !user.emailVerified || isNitroHashedEmailOptedOut()) {
        clearNitroHashedEmail();
        return;
    }

    const hashedEmail = await hashEmailForAds(user.email);
    setNitroHashedEmail(hashedEmail);
}

const getFirebaseToken = async (openIdParams: Record<string, string>) => {
    // No point in running without steamData
    if (!openIdParams) {
        return;
    }

    const target_function = "https://us-central1-idlemmo.cloudfunctions.net/asil"

    const requestData = {
        data: {
            claimedId: openIdParams.steamId,
            nonce: openIdParams["openid.response_nonce"],
            assocHandle: openIdParams["openid.assoc_handle"],
            sig: openIdParams["openid.sig"],
            signed: openIdParams["openid.signed"]
        }
    };

    try {
        const response = await fetch(target_function, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Error fetching Firebase token:", error);
        return null;
    }
}

export const createAuthStore = (
    initState: AuthState = defaultInitState,
) => {
    return createStore<AuthStore>()((set, get) => {
        const runLogin = async (
            signIn: (auth: Auth) => Promise<User>,
            eventName: string,
            options?: LoginOptions,
        ): Promise<boolean> => {
            const isAddAccount = options?.addAccount === true;
            const slot = isAddAccount || loadSavedAccounts().length > 0
                ? createAccountSlot()
                : { id: 'default', appName: DEFAULT_FIREBASE_APP_NAME };
            const targetApp = getAccountFirebaseApp(slot.appName);
            const auth = getAuth(targetApp);

            try {
                const signedInUser = await signIn(auth);
                loginEvent(eventName);

                const previousActiveAccountId = get().activeAccountId;
                const { accounts, activeAccount, isDuplicate } = registerAccount(slot, signedInUser.uid);

                if (isDuplicate) {
                    await deleteAccountFirebaseApp(slot.appName);
                }

                await syncNitroHashedEmail(signedInUser);

                if (isAddAccount) {
                    set({
                        accounts,
                        activeAccountId: activeAccount.id,
                        errorCode: undefined,
                    });

                    // Reload only when switching to a different account so the data pipeline starts cleanly.
                    if (!isDuplicate || activeAccount.id !== previousActiveAccountId) {
                        reloadPage();
                    }
                    return true;
                }

                set({
                    user: signedInUser,
                    authStatus: AuthStatus.Valid,
                    accounts,
                    activeAccountId: activeAccount.id,
                    errorCode: undefined,
                });
                return true;
            } catch (error: any) {
                console.debug(error?.code, error?.message);
                await deleteAccountFirebaseApp(slot.appName);

                if (isAddAccount) {
                    set({ errorCode: error?.code ?? 'auth/unknown' });
                } else {
                    set({
                        authStatus: AuthStatus.NoUser,
                        errorCode: error?.code ?? 'auth/unknown',
                    });
                }
                return false;
            }
        };

        return {
            ...initState,
            clearError: () => {
                set({ errorCode: undefined });
            },
            switchAccount: (accountId: string) => {
                const { accounts, activeAccountId } = get();
                if (accountId === activeAccountId) {
                    return;
                }

                const targetAccount = accounts.find((account) => account.id === accountId);
                if (!targetAccount) {
                    return;
                }

                setActiveAccountId(targetAccount.id);
                reloadPage();
            },
            removeAccount: async (accountId: string) => {
                const { accounts, activeAccountId, logout } = get();
                if (accountId === activeAccountId) {
                    await logout();
                    return;
                }

                const targetAccount = accounts.find((account) => account.id === accountId);
                if (!targetAccount) {
                    return;
                }

                try {
                    const targetApp = getAccountFirebaseApp(targetAccount.appName);
                    const auth = getAuth(targetApp);
                    await auth.authStateReady();
                    await signOut(auth);
                    await deleteAccountFirebaseApp(targetAccount.appName);
                } catch (error: any) {
                    console.log(error?.code, error?.message);
                }

                const { accounts: remainingAccounts } = removeAccountFromRegistry(accountId);
                set({ accounts: remainingAccounts });
            },
            logout: async () => {
                const activeAccount = getActiveAccount();
                const auth = getAuth(getActiveFirebaseApp());

                try {
                    await signOut(auth);
                    clearNitroHashedEmail();
                    sendEvent({
                        action: "logout",
                        category: "engagement",
                        value: 1,
                    });
                } catch (error: any) {
                    console.log(error?.code, error?.message);
                }

                if (activeAccount) {
                    removeAccountFromRegistry(activeAccount.id);
                    await deleteAccountFirebaseApp(activeAccount.appName);
                }

                reloadPage();
            },
            logoutAll: async () => {
                const accounts = loadSavedAccounts();
                const appNamesToSignOut = new Set<string>(accounts.map((account) => account.appName));
                appNamesToSignOut.add(DEFAULT_FIREBASE_APP_NAME);

                for (const appName of appNamesToSignOut) {
                    try {
                        const targetApp = getAccountFirebaseApp(appName);
                        const auth = getAuth(targetApp);
                        await auth.authStateReady();
                        if (auth.currentUser) {
                            await signOut(auth);
                        }
                        await deleteAccountFirebaseApp(appName);
                    } catch (error: any) {
                        console.log(error?.code, error?.message);
                    }
                }

                clearAccountRegistry();
                clearNitroHashedEmail();
                sendEvent({
                    action: "logout",
                    category: "engagement",
                    value: 1,
                });

                reloadPage();
            },
            appleLogin: async (options?: LoginOptions) => {
                const provider = new OAuthProvider('apple.com');
                AppleLogin.initAuth();

                return runLogin(async (auth) => {
                    const idToken = await AppleLogin.signIn();
                    const credential = provider.credential({ idToken });
                    const result = await signInWithCredential(auth, credential);
                    return result.user;
                }, "APPLE", options);
            },
            emailLogin: async (email: string, password: string, options?: LoginOptions) => {
                return runLogin(async (auth) => {
                    const credential = EmailAuthProvider.credential(email, password);
                    const result = await signInWithCredential(auth, credential);
                    return result.user;
                }, "EMAIL", options);
            },
            googleLogin: async (id_token: string, options?: LoginOptions) => {
                return runLogin(async (auth) => {
                    const credential = GoogleAuthProvider.credential(id_token, null);
                    const result = await signInWithCredential(auth, credential);
                    return result.user;
                }, "TOKEN", options);
            },
            uglySteamLogin: async (redirectUrl: string, options?: LoginOptions) => {
                const params = new URLSearchParams(redirectUrl);
                const openIdParams: Record<string, string> = {};

                // Extract all openid parameters
                params.forEach((value, key) => {
                    if (key.startsWith('openid.')) {
                        openIdParams[key] = value;
                    }
                });

                // Extract Steam ID from claimed_id
                const claimedId = openIdParams['openid.claimed_id'] || '';
                const steamId = claimedId.match(/\/id\/(\d+)$/)?.[1];
                openIdParams["steamId"] = steamId || '';

                // Get the custom token from the server
                const customToken = await getFirebaseToken(openIdParams);
                if (customToken == null) {
                    if (options?.addAccount) {
                        set({ errorCode: "INVALID_OPENID_PARAMS" });
                    } else {
                        set({
                            authStatus: AuthStatus.NoUser,
                            errorCode: "INVALID_OPENID_PARAMS",
                        });
                    }
                    return false;
                }

                return runLogin(async (auth) => {
                    const result = await signInWithCustomToken(auth, customToken);
                    return result.user;
                }, "CUSTOM_TOKEN", options);
            },
            initialize: async () => {
                set({ initialized: true });

                if (isSubDomain()) {
                    set({
                        user: undefined,
                        authStatus: AuthStatus.NoUser,
                        accounts: [],
                        activeAccountId: null,
                    });
                    return;
                }

                const maxAttempts = loadSavedAccounts().length + 1;
                for (let attempt = 0; attempt < maxAttempts; attempt++) {
                    const activeAccount = getActiveAccount();
                    const appName = activeAccount?.appName ?? DEFAULT_FIREBASE_APP_NAME;
                    const auth = getAuth(getAccountFirebaseApp(appName));
                    await auth.authStateReady();

                    if (auth.currentUser) {
                        if (!activeAccount) {
                            const migrated = registerExistingDefaultAccount(auth.currentUser.uid);
                            await syncNitroHashedEmail(auth.currentUser);
                            set({
                                user: auth.currentUser,
                                authStatus: AuthStatus.Valid,
                                accounts: migrated.accounts,
                                activeAccountId: migrated.activeAccount.id,
                            });
                            return;
                        }

                        await syncNitroHashedEmail(auth.currentUser);
                        set({
                            user: auth.currentUser,
                            authStatus: AuthStatus.Valid,
                            accounts: loadSavedAccounts(),
                            activeAccountId: activeAccount.id,
                        });
                        return;
                    }

                    if (!activeAccount) {
                        break;
                    }

                    // Drop expired account slots and fall back to the next saved account.
                    removeAccountFromRegistry(activeAccount.id);
                    await deleteAccountFirebaseApp(activeAccount.appName);
                }

                clearNitroHashedEmail();
                set({
                    user: undefined,
                    authStatus: AuthStatus.NoUser,
                    accounts: [],
                    activeAccountId: null,
                });
            },
        }
    })
}
