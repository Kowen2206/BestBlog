import React from 'react';
import LoginCard from "../components/LoginCard"
import '../assets/styles/Moleculas/LoginCard.scss'
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () =>{

    return (
        <>
            <Header/>
            <div className="Login__Container">
                <LoginCard/>
            </div>
            <Footer/>
        </>
    );
}

export default Login;