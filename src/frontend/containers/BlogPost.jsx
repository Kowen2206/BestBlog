import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/styles/Organismos/Footer.scss';
import BlogContent from '../components/BlogContent';

const BlogPost = () =>{
return(
    <div className="App">
            <Header/>
            <BlogContent/>
            <Footer/>
    </div>
);
}

export default BlogPost;