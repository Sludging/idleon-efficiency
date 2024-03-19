import { EmailAuthProvider, GoogleAuthProvider, OAuthProvider, User, getAuth, signInWithCredential, signOut } from 'firebase/auth'
import { createStore } from 'zustand/vanilla'
import { AuthStatus } from '../../data/firebase/authContext'
import app from '../../data/firebase/config'
import { loginEvent, sendEvent } from '../gtag'
import { AppleLogin } from '../../data/domain/login/appleLogin'
import { isSubDomain } from '../../data/utility'

export type AuthState = {
    // We use this to mark if we ran the initial init or not. Init is used to fetch a user if previously authenticated.
    initialized: boolean
    user?: User
    authStatus: AuthStatus
    errorCode?: string
}

export type AuthActions = {
    logout: () => void
    googleLogin: (id_token: string) => void
    emailLogin: (email: string, password: string) => void
    appleLogin: () => void
    initialize: () => void
}

export type AuthStore = AuthState & AuthActions

export const initAuthStore = async (): Promise<Partial<AuthState>> => {
    if (isSubDomain()) {
        return {
            authStatus: AuthStatus.NoUser
        }
    } else {
        const auth = getAuth(app);
        await auth.authStateReady()

        if (auth.currentUser) {
            return {
                user: auth.currentUser,
                authStatus: AuthStatus.Valid
            }
        }
        else {
            return {
                user: undefined,
                authStatus: AuthStatus.NoUser
            }
        }
    }
}

export const defaultInitState: AuthState = {
    authStatus: AuthStatus.Loading,
    initialized: false,
}

const loginThroughToken = async (id_token: string, callback?: Function): Promise<Partial<AuthState>> => {
    const auth = getAuth(app);
    const credential = GoogleAuthProvider.credential(id_token, null);
    try {
        const result = await signInWithCredential(auth, credential)
        loginEvent("TOKEN");
        return {
            user: result.user,
            authStatus: AuthStatus.Valid
        }
    } catch (error: any) {
        console.debug(error.code, error.message);
        return {
            authStatus: AuthStatus.NoUser,
            errorCode: error.code
        }
    }
};

const loginThroughEmailPassword = async (email: string, password: string): Promise<Partial<AuthState>> => {
    const auth = getAuth(app);
    try {
        const credential = EmailAuthProvider.credential(email, password);
        const result = await signInWithCredential(auth, credential)
        loginEvent("EMAIL");
        return {
            user: result.user,
            authStatus: AuthStatus.Valid
        }
    } catch (error: any) {
        console.debug(error.code, error.message);
        return {
            authStatus: AuthStatus.NoUser,
            errorCode: error.code
        }
    }
}

const loginThroughApple = async (): Promise<Partial<AuthState>> => {
    const auth = getAuth(app);
    const provider = new OAuthProvider('apple.com');

    AppleLogin.initAuth();
    try {
        const idToken = await AppleLogin.signIn();
        const credential = provider.credential({ idToken: idToken });
        const result = await signInWithCredential(auth, credential)
        loginEvent("APPLE");
        return {
            user: result.user,
            authStatus: AuthStatus.Valid
        };
    }
    catch (error: any) {
        console.debug(error.code, error.message);
        return {
            authStatus: AuthStatus.NoUser,
            errorCode: error.code
        }
    }
}

const logout = async (): Promise<Partial<AuthState>> => {
    const auth = getAuth(app);

    try {
        await signOut(auth)
        sendEvent({
            action: "logout",
            category: "engagement",
            value: 1,
        });
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    }

    return { user: undefined, authStatus: AuthStatus.NoUser }
}

export const createAuthStore = (
    initState: AuthState = defaultInitState,
) => {
    return createStore<AuthStore>()((set) => ({
        ...initState,
        logout: async () => {
            const result = await logout();
            set((state) => result)
        },
        appleLogin: async () => {
            const result = await loginThroughApple();
            set((state) => result)
        },
        emailLogin: async (email: string, password: string) => {
            const result = await loginThroughEmailPassword(email, password);
            set((state) => result);
        },
        googleLogin: async (id_token: string) => {
            const result = await loginThroughToken(id_token);
            set((state) => result)
        },
        initialize: async () => {
            set((state) => ({ initialized: true }));
            const auth = getAuth(app);
            await auth.authStateReady()

            if (auth.currentUser) {
                set((state) => ({
                    user: auth.currentUser!,
                    authStatus: AuthStatus.Valid,
                }))
            }
            else {
                set((state) => ({
                    user: undefined,
                    authStatus: AuthStatus.NoUser,
                }))
            }
        }
    }))
}