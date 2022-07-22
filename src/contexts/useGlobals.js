import React, { createContext, useContext, useMemo, useState } from "react";

export const GlobalContext = createContext({})
export const GlobalProvider = ({ children }) => {
    // App Loading
    const [loading, setLoading] = useState(false)

    // App Alerts
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        variant: '',
    })

    // Function to Toggle Alert
    const displayAlert = (show, variant, message) => {
        setAlert({
            show,
            message,
            variant,
        })
        setTimeout(() => setAlert({
            show: false,
            message: '',
            variant: '',
        }), 2000)
    }

    const value = {
        loading,
        setLoading,
        alert,
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