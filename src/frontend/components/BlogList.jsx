import React from 'react';
import BlogListItem from "./BlogListItem";
import "../assets/styles/Moleculas/BlogList.scss";
import Carrusel from "./Carrusel";

const BlogList = () =>{
    return(
        <div className="blogList__container">
            <Carrusel/>
            <BlogListItem/>
        </div>
    );
}

export default BlogList;