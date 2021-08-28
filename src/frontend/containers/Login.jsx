import React from 'react';
import LoginComponent from "../components/LoginComponent";
import '../assets/styles/Moleculas/LoginCard.scss';
import '../assets/styles/Atomos/UploadImageButton.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () =>{

    return (
        <>
            <Header/>
            <div className="Login__Container">
                <LoginComponent/>
            </div>
            <Footer/>
        </>
    );
}

export default Login;
