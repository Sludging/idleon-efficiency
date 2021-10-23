import React, { useEffect, useState } from "react";
import { getAuth, User } from 'firebase/auth';
import app from "./config";
import { GoogleAuthProvider, signInWithPopup, signInWithCredential, signOut } from "firebase/auth";

interface AuthData {
    user: User | null
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

    const loginUser = () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                setUser(result.user);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    const loginThroughToken = (id_token: string) => {
        const auth = getAuth(app);
        const credential = GoogleAuthProvider.credential(id_token, null);
        console.log(credential);
        signInWithCredential(auth, credential)
            .then((result) => {
                setUser(result.user);
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
                console.log(result);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
        location.reload();
    }


    useEffect(() => {
        const auth = getAuth(app);
        auth.onAuthStateChanged(res => {
            if (res) {
                setUser(res);
            }
        })
    }, []);

    return (
        <AuthContext.Provider value={{
            user: user,
            loginFunction: loginUser,
            logoutFunction: logout,
            tokenFunction: loginThroughToken
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};
