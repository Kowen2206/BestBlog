import React from 'react';
import BlogContent from '../components/BlogContent';
import Header from '../components/Header';
import Footer from '../components/Footer';

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