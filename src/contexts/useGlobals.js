import React, { createContext, useContext, useMemo, useState } from "react";

export const GlobalContext = createContext({})
export const GlobalProvider = ({ children }) => {
    // App Loading
    const [loading, setLoading] = useState(false)

    // App Alerts
    const [showAlert, setShowAlert] = useState({
        show: false,
        message: '',
        variant: '',
    })

    // Function to Toggle Alert
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

    const value = {
        loading,
        setLoading,
        showAlert,
        displayAlert,
    }

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