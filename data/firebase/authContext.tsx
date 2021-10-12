import React, { useEffect, useState } from "react";
import { getAuth, User } from 'firebase/auth';
import app from "./config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface AuthData {
    user: User | null
    loginFunction: (event: React.MouseEvent<HTMLButtonElement>) => void
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

    const loginUser = (event: React.MouseEvent<HTMLButtonElement>) => {
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
            loginFunction: loginUser
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};
