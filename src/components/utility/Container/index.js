import React from 'react'

const Container = ({
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
    ...props
}) => {

    // Container Styles
    const styles = {
        width: width ? width : '100%',
        minWidth: minWidth ? minWidth : '0%',
        maxWidth: maxWidth ? maxWidth : '100%',
        height: height ? height : '100%',
        minHeight: minHeight ? minHeight : '0%',
        maxHeight: maxHeight ? maxHeight : '100%',
        padding: padding ? padding : '0px',
        margin: margin ? margin : '0px',
        display: display ? display : 'flex',
        alignItems: align ? align : 'center',
        justifyContent: justify ? justify : 'center',
        flexDirection: direction ? direction : 'column',
        gap: gap ? gap : '2px',
        flexWrap: wrap ? wrap : 'wrap'
    }

    return (
        <div id='container' style={styles} {...props} >
            {children}
        </div>
    )
}

export default Container