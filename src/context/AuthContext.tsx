import React, {ReactNode, createContext, useContext, useEffect, useState} from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    UserCredential,
    User
} from 'firebase/auth'
import {auth} from '../firebase'

// const UserContext = createContext()

type UserContextType = {
    createUser: (email: string, password: string) => Promise<UserCredential>,
    signIn: (email: string, password: string) => Promise<UserCredential>,
    logout: () => Promise<void>,
    user: User,
  }

const UserContext = createContext<UserContextType | null>(null)

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // const [user, setUser] = useState({});
    const [user, setUser] = useState<User>({} as User);

    const createUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const signIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
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

