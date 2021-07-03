import React from 'react'
import ErrorWindow from './ErrorWindow'
import '../assets/styles/Organismos/ErrorWindow.scss'

const Layout = ({children}) => {
    return (
        <>
            
            {children}
            <ErrorWindow/>
            
        </>
    )
}

export default Layout
