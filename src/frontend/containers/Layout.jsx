import React from 'react'
import MessageWindow from './MessageWindow'
import '../assets/styles/Organismos/ErrorWindow.scss'

const Layout = ({children}) => {
    return (
        <>
            {children}
            <MessageWindow/>
        </>
    )
}

export default Layout
