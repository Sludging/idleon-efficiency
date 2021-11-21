import React, { useEffect, useState } from "react";
import { getAuth, User } from 'firebase/auth';
import app from "./config";
import { GoogleAuthProvider, signInWithPopup, signInWithCredential, signOut } from "firebase/auth";

import { sendEvent, loginEvent } from '../../lib/gtag';
import { useRouter } from "next/dist/client/router";

interface AuthData {
    user: User | null
    isLoading: boolean
    loginFunction: Function
    logoutFunction: Function
    tokenFunction: Function
}

export const AuthContext = React.createContext<AuthData | null>(null);

export const getAuthData = (): AuthData => {
    const contextState = React.useContext(AuthContext);
    if (contextState === null) {
        throw new Error('User information only available within a AuthContext tag');
    }
    return contextState;
};

export const AuthProvider: React.FC<{}> = (props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const loginUser = () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                setUser(result.user);
                loginEvent("GOGGLE");
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    const loginThroughToken = (id_token: string) => {
        const auth = getAuth(app);
        const credential = GoogleAuthProvider.credential(id_token, null);
        signInWithCredential(auth, credential)
            .then((result) => {
                setUser(result.user);
                loginEvent("TOKEN");
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    const logout = () => {
        const auth = getAuth(app);
        signOut(auth)
            .then((result) => {
                sendEvent({
                    action: "logout",
                    category: "engagement",
                    value: 1,
                });
                router.push('/');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }


    useEffect(() => {
        setLoading(true);
        const auth = getAuth(app);
        auth.onAuthStateChanged(res => {
            if (res) {
                setUser(res);
            }
            else {
                setUser(null);
            }
            setLoading(false);
        })
    }, [user]);

    return (
        <AuthContext.Provider value={{
            user: user,
            isLoading: loading,
            loginFunction: loginUser,
            logoutFunction: logout,
            tokenFunction: loginThroughToken
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};
