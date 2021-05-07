import React from 'react';
import Landing from '../components/Landing';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/styles/App.scss'

const Home = () =>{

    return(
        <div className="App">
            <Header/>
                <Landing/>
            <Footer/>
        </div>
    );
}

export default Home;