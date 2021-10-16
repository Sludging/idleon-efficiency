import React, { useEffect, useState } from "react";
import { getAuth, User } from 'firebase/auth';
import app from "./config";
import { GoogleAuthProvider, signInWithPopup, signInAnonymously, signOut } from "firebase/auth";

interface AuthData {
    user: User | null
    loginFunction: Function
    logoutFunction: Function
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
            logoutFunction: logout
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};
