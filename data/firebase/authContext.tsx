import React, { useEffect, useState } from "react";
import { getAuth, User } from 'firebase/auth';
import app from "./config";

export const AuthContext = React.createContext<User | null>(null);

export const getUser = (): User => {
    const contextState = React.useContext(AuthContext);
    if (contextState === null) {
        throw new Error('useItemData must be used within a ItemDataProvider tag');
    }
    return contextState;
};

export const AuthProvider: React.FC<{}> = (props) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const auth = getAuth(app);
        auth.onAuthStateChanged(res => {
            if (res) {
                setUser(res);
            }
        })
    }, []);

    return (
        <AuthContext.Provider value={user}>
            {props.children}
        </AuthContext.Provider>
    );
};
