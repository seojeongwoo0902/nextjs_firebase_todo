import React, { useContext, useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import { User } from "@firebase/auth";
import firebase from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// import {doc, getDoc} from 'firebase/firestore'
// import { async } from "@firebase/util";

const AuthContext = React.createContext<any | null>(null);

export function useAuth(): any {
  return useContext(AuthContext);
}
const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const userInfo = useRef();

  function signup(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password);
    return;
  }
  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

//   function logout() {
//     signOut(auth)
//     .then(() => {
//       // Sign-out successful.
//     })
//     .catch((error) => {
//       // An error happened.
//     });
//     // return signOut(auth);
//   }
const logout = async () => {
    return await auth.signOut()
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: any = {
    currentUser,
    login,
    signup,
    logout,
    userInfo,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
