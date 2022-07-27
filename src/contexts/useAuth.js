import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState, useMemo, useContext } from "react";
import { auth, db } from "@/Firebase/index";
import useGlobals from "@/Contexts/useGlobals"
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { Loading } from "@/Components/utility";

export const AuthContext = createContext({})
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)
    const [dataLoading, setDataLoading] = useState(false)
    const [userData, setUserData] = useState(null)

    // Global Context states
    const { setLoading, displayAlert } = useGlobals()

    useEffect(() => onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
            setDataLoading(true)
            onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
                if (!snapshot.exists()) {
                    setDoc(doc(db, 'users', user.uid), {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        createdAt: serverTimestamp(),
                        profileComplete: false,
                    })
                    setDataLoading(false)
                } else {
                    setUserData(snapshot.data())
                    setDataLoading(false)
                }
            })

        }
        else {
            setUser(null)
        }
        // setTimeout(() => setAuthLoading(false), 1000)
        setAuthLoading(false)
    }), [])
    const provider = new GoogleAuthProvider()
    const signInWithGoogle = () => (
        signInWithPopup(auth, provider)
    )
    const logOut = () => {
        setLoading(true)
        signOut(auth)
            .then(() => {
                displayAlert(true, 'success', 'Logged Out')
                setLoading(false)
            })
            .catch(error => {
                setError(error)
            }).finally(() => {
                setLoading(false)
            })
    }

    // values to be passed to children
    const value = {
        user,
        setUser,
        authLoading,
        setAuthLoading,
        userData,
        setUserData,
        dataLoading,
        setDataLoading,
        signInWithGoogle,
        logOut,
    }
    return (
        <AuthContext.Provider value={value}>
            {
                !authLoading && !dataLoading ? children : <Loading />
            }
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth