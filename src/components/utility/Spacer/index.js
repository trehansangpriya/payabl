import React from 'react'

const Spacer = ({ h }) => {

    // Spacer Styles
    const styles = {
        height: h,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }

    // Render Spacer Component
    return (
        <div id='spacer' style={styles}></div>
    )
}

export default Spacer