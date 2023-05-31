import React, {createContext, useContext, useEffect, useState} from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {auth} from '../firebase'

type User = {
    email: string;
    password: string;
  };

type AuthContextProps = {
    createUser: (email: string, password: string) => Promise<any>;
    user: User;
    logout: () => Promise<any>;
    signIn: (email: string, password: string) => Promise<any>;
  };

const UserContext = createContext<AuthContextProps>({} as AuthContextProps);
// const UserContext = createContext()

export const AuthContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User>({});

    const createUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth)
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
        });
        return () =>{
            unsubscribe();
        }
    }, [])

    return (
        <UserContext.Provider value={{ createUser, user, logout, signIn }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}