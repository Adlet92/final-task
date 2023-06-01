import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import Loading from 'src/components/Loading/Loading'
import { auth } from '../firebase'

// const UserContext = createContext()

type UserContextType = {
    createUser: (email: string, password: string) => Promise<UserCredential>,
    signIn: (email: string, password: string) => Promise<UserCredential>,
    logout: () => Promise<void>,
    user: User | null,
  }

const UserContext = createContext<UserContextType | null>(null)

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // const [user, setUser] = useState({});
    // const [user, setUser] = useState<User>({} as User);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
          setIsLoading(false);
        });

        return () =>{
            unsubscribe();
        }
    }, [])

    if (isLoading) {
      return <Loading/>;
    }

    return (
        <UserContext.Provider value={{ createUser, user, logout, signIn }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}


