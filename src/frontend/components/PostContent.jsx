import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadArticle } from '../actions';
import { injectArticle } from '../actions';
import '../assets/styles/Moleculas/BlogContent.scss';
import HeaderImage from './HeaderImage';
import { useParams } from 'react-router-dom';
import user from '../../server/routes/user';

const PostContent = (props) => {
    
    let { id } = useParams();

    useEffect(() => {
        props.loadArticle({userId: props.userId, articleId: id});
        return () =>{
            props.injectArticle([])
        }

    }, []);

    return (
        <>
            <HeaderImage Image={props.articleView.ArticlePhoto} />
            <h1 className="blogContent_title"> {props.articleView.Title} </h1>
            <hr />
            <div className="blogContent__container" onClick={() => console.log(props)} dangerouslySetInnerHTML={{ __html: props.articleView.ArticleContent }}>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        articleView: state.articleView,
        userId: user.id
    }
}

const mapDispatchToProps = {
    loadArticle,
    injectArticle
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContent);