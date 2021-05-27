import React from 'react';
import BlogListItem from "./BlogListItem";
import "../assets/styles/Moleculas/BlogList.scss";
import Carrusel from "./Carrusel";
import { connect } from 'react-redux'


const BlogList = (props) =>{
    return(
        <div className="blogList__container">
            <Carrusel/>

                {props.articles.map(item => {
                return <BlogListItem key={item.id} {...item} />})
                }


        </div>
    );
}

const mapStateToProps  = state => {
    return {articles: state.articles}
}

export default connect(mapStateToProps, null)(BlogList);