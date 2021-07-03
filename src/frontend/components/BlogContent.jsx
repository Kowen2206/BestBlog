import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadArticle } from '../actions';
import { injectArticle } from '../actions';
import '../assets/styles/Moleculas/BlogContent.scss';
import HeaderImage from './HeaderImage';

const BlogContent = (props) => {
    

    const getParams = () => {
        console.log(window.location.href.substring(27, window.location.href.length));
        return window.location.href.substring(27, window.location.href.length);
    }

    useEffect(() => {
        let id = getParams();
        props.loadArticle(id);
        console.log(props.articleView)

        return () =>{
            props.injectArticle([])
        }

    }, []);

    return (
        <>
            <HeaderImage Image={props.articleView.ArticlePhoto} />
            <h1 className="blogContent_title"> {props.articleView.Title} </h1>
            <div className="blogContent__container" onClick={() => console.log(props)} dangerouslySetInnerHTML={{ __html: props.articleView.ArticleContent }}>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        articleView: state.articleView
    }
}

const mapDispatchToProps = {
    loadArticle,
    injectArticle
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogContent);