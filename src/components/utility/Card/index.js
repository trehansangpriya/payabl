import React from 'react'

const Card = ({
    children,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    padding,
    margin,
    align,
    justify,
    display,
    direction,
    gap,
    wrap,
    textAlign,
    className,
    ...props
}) => {
    const styles = {
        width: width ? width : '100%',
        minWidth: minWidth ? minWidth : '0%',
        maxWidth: maxWidth ? maxWidth : '100%',
        height: height ? height : '100%',
        minHeight: minHeight ? minHeight : '0%',
        maxHeight: maxHeight ? maxHeight : '100%',
        padding: padding ? padding : '12px',
        margin: margin ? margin : '4px',
        display: display ? display : 'flex',
        alignItems: align ? align : 'flex-start',
        justifyContent: justify ? justify : 'flex-start',
        flexDirection: direction ? direction : 'column',
        gap: gap ? gap : '4px',
        flexWrap: wrap ? wrap : 'wrap',
        textAlign: textAlign ? textAlign : 'left',
    }
    return (
        <div id='card' className={`shadow rounded ${className}`} style={styles} {...props} >
            {children}
        </div>
    )
}

export default Card