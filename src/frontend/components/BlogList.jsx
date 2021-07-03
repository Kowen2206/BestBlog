import React,{useEffect} from 'react';
import BlogListItem from "./BlogListItem";
import "../assets/styles/Moleculas/BlogList.scss";
import Carrusel from "./Carrusel";
import { connect } from 'react-redux'

const BlogList = (props) =>{

    //index: nos ayuda a generar un indice para el acomodo de los articulos con css
    let index = props.articles.length;
    useEffect(()=>{},[index]);

    return(
        <div className="blogList__container">
            <Carrusel articles={props.articles} />
            <div className="blogLitsItem__container">
                {props.articles.map(item => {index -= 1;  return <BlogListItem orderIndex={index} key={item._id} {...item} />})}
            </div>
        </div>
    );
}

const mapStateToProps  = state => {
    return {articles: state.articles}
}

export default connect(mapStateToProps, null)(BlogList);