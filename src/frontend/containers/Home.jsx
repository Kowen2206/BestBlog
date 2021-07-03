import React from 'react';
import BlogList from '../components/BlogList';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () =>{
return(
    <div className="App">
            <Header/>
            <BlogList/>
            <Footer/>
    </div>
);
}

export default Home;