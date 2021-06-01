import React from 'react';
import BlogList from '../components/BlogList';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Blog = () =>{
return(
    <div className="App">
            <Header/>
            <BlogList> 
                
            </BlogList>
            <Footer/>
    </div>
);
}

export default Blog;