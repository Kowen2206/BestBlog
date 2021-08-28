import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/styles/Organismos/Footer.scss';
import PostContent from '../components/PostContent';

const Post = () =>{
return(
    <div className="App">
            <Header/>
            <PostContent/>
            <Footer/>
    </div>
);
}

export default Post;