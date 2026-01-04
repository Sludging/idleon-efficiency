'use client'

import React, { useCallback, useEffect, useState } from "react";
import { getAuth, User } from 'firebase/auth';
import app from "./config";
import { GoogleAuthProvider, signInWithCredential, signOut, EmailAuthProvider, OAuthProvider } from "firebase/auth";

import { sendEvent, loginEvent } from '../../lib/gtag';
import { AppleLogin } from "../domain/login/appleLogin";
import { isSubDomain } from "../utility";

export enum AuthStatus {
    Loading,
    Valid,
    NoUser
}

interface AuthData {
    user: User | null
    authStatus: AuthStatus
    logoutFunction: Function
    tokenFunction: Function
    emailLoginFunction: Function
    appleFunction: Function
}

export const AuthContext = React.createContext<AuthData | null>(null);

export const getAuthData = (): AuthData => {
    const contextState = React.useContext(AuthContext);
    if (contextState === null) {
        throw new Error('User information only available within a AuthContext tag');
    }
    return contextState;
};

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);

    const loginThroughToken = useCallback((id_token: string, callback?: Function) => {
        const auth = getAuth(app);
        const credential = GoogleAuthProvider.credential(id_token, null);
        signInWithCredential(auth, credential)
            .then((result) => {
                setUser(result.user);
                loginEvent("TOKEN");
                setAuthStatus(AuthStatus.Valid);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (callback) {
                    callback(errorCode);
                }
                console.debug(errorCode, errorMessage);
            });
    }, [])

    const loginThroughEmailPassword = useCallback((email: string, password: string, callback?: Function) => {
        const auth = getAuth(app);
        const credential = EmailAuthProvider.credential(email, password);
        signInWithCredential(auth, credential)
            .then((result) => {
                setUser(result.user);
                loginEvent("EMAIL");
                setAuthStatus(AuthStatus.Valid);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (callback) {
                    callback(errorCode);
                }
                console.debug(errorCode, errorMessage);
            });
    }, [])

    const loginThroughApple = useCallback(async (callback?: Function) => {
        const auth = getAuth(app);
        const provider = new OAuthProvider('apple.com');

        AppleLogin.initAuth();
        try {
            const idToken = await AppleLogin.signIn();
            const credential = provider.credential({ idToken: idToken });
            signInWithCredential(auth, credential)
                .then((result) => {
                    setUser(result.user);
                    loginEvent("APPLE");
                    setAuthStatus(AuthStatus.Valid);
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (callback) {
                        callback(errorCode);
                    }
                    console.debug(errorCode, errorMessage);
                });
        } catch (e) {
            console.log("Something went wrong, contact me")
            if (callback) {
                callback(e);
            }
        }
    }, [])

    const logout = useCallback(() => {
        const auth = getAuth(app);

        if (user) {
            signOut(auth)
                .then((_) => {
                    sendEvent({
                        action: "logout",
                        category: "engagement",
                        value: 1,
                    });
                    setUser(null);
                    setAuthStatus(AuthStatus.NoUser);
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        }
    }, [user])

    useEffect(() => {
        // If we are on a subdomain, no need to configure user auth.
        if (authStatus == AuthStatus.Loading) {
            if (isSubDomain()) {
                setAuthStatus(AuthStatus.NoUser);

            } else {
                const auth = getAuth(app);
                auth.onAuthStateChanged(res => {
                    if (res) {
                        setUser(res);
                        setAuthStatus(AuthStatus.Valid);
                    }
                    else {
                        setUser(null);
                        setAuthStatus(AuthStatus.NoUser);

                    }
                })
            }
        }
    }, [authStatus])

    return (
        <AuthContext.Provider value={{
            user: user,
            authStatus: authStatus,
            emailLoginFunction: loginThroughEmailPassword,
            logoutFunction: logout,
            tokenFunction: loginThroughToken,
            appleFunction: loginThroughApple,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
