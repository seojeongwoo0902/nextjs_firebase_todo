import React, {useContext, useState, useEffect, useRef} from "react";
import {auth,db} from '../firebase' 
import { User } from "@firebase/auth";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword,
signOut, onAuthStateChanged} from 'firebase/auth'
import {doc, getDoc} from 'firebase/firestore'
import { async } from "@firebase/util";

const AuthContext = React.createContext<User | null>(null);

export function useAuth(){
    return useContext(AuthContext)
}
const AuthProvider: React.FC = ({children}:any)=>{
    const [currentUser, setCurrentUser] = useState<any | null>(null)
    const [loading, setLoading] = useState<boolean | null>(null)
    const userInfo = useRef()

    function signup(email:string, password:string){
        createUserWithEmailAndPassword(auth, email, password)
        return
    }
    function login(email:string, password:string){
        return signInWithEmailAndPassword(auth, email, password)
    }
    function logout(){
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,async user=>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    },[])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        userInfo
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider