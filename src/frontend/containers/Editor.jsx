import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/styles/Moleculas/Editor.scss';
import TextEditor from '../components/TextEditor';

const Editor = () =>{

    return(

    <>
    <Header/>
        <TextEditor/>
    <Footer/>
    </>      

    );

}

export default Editor;