import React, { createContext, useContext, useMemo, useState } from "react";

export const GlobalContext = createContext({})
export const GlobalProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState({
        show: false,
        message: '',
        variant: '',
    })
    const displayAlert = (show, variant, message) => {
        setShowAlert({
            show,
            message,
            variant,
        })
        setTimeout(() => setShowAlert({
            show: false,
            message: '',
            variant: '',
        }), 2000)
    }
    const value = useMemo(() => ({
        loading,
        setLoading,
        showAlert,
        displayAlert,
    }), [loading, showAlert])
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobals = () => {
    return useContext(GlobalContext)
}

export default useGlobals