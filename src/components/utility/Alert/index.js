import React, { useEffect, useState } from 'react';
import { FiXCircle, FiAlertTriangle, FiCheckCircle, FiInfo } from 'react-icons/fi'
import useGlobals from '@/Contexts/useGlobals'

const Alert = ({ show, message, variant, dummy }) => {
    const { showAlert } = useGlobals()
    const [alertVariant, setAlertVariant] = useState('')
    const [alertIcon, setAlertIcon] = useState(null)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertShow, setAlertShow] = useState(true)

    useEffect(() => {
        const variants = {
            error: 'bg-error-100 text-error-600',
            success: 'bg-success-100 text-success-600',
            warn: 'bg-warn-100 text-warn-600',
            info: 'bg-info-100 text-info-600',
        }
        const icons = {
            error: <FiXCircle size='20px' />,
            success: <FiCheckCircle size='20px' />,
            warn: <FiAlertTriangle size='20px' />,
            info: <FiInfo size='20px' />,
        }
        if (dummy) {
            setAlertVariant(variants[variant])
            setAlertIcon(icons[variant])
            setAlertMessage(message)
            setAlertShow(show)
        }
        else {
            setAlertVariant(variants[showAlert.variant])
            setAlertIcon(icons[showAlert.variant])
            setAlertMessage(showAlert.message)
            setAlertShow(showAlert.show)
        }
    }, [dummy, message, show, variant, showAlert])

    return (
        <div className={[
            'p-[16px] m-1 flex justify-start items-center gap-2 w-full max-w-[320px] text-contentl shadow-default rounded font-button cursor-pointer',
            alertVariant,
            dummy ? '' : 'fixed transition-all duration-200 bottom-[-10%] z-50  left-[50%] translate-x-[-50%]',
            !dummy && (alertShow ? 'bottom-[20px] opacity-100 visible' : 'bottom-[-10px] opacity-0 invisible'),
        ].join(' ')}
            onClick={() => {
                !dummy && setAlertShow(!alertShow)
            }}
        >
            {alertIcon}
            <span>
                {alertMessage}
            </span>
        </div>
    )
}

export default Alert