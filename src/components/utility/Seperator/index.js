import React from 'react'

const Separator = ({ text, className = '', h }) => {
    return (
        <div className={"flex w-full items-center justify-between " + className} style={{
            height: h
        }}>
            <div className="w-full bg-layout-200 h-px"></div>
            {text && <span className="px-2">{text}</span>}
            <div className="w-full bg-layout-200 h-px"></div>
        </div>
    )
}

export default Separator