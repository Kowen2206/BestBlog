import React from 'react';
import {connect} from 'react-redux'
import {loadArticle} from '../actions'

const BlogContent = (props) =>{

    const {articleView} = props;

    return(
        <div className="blogContent__Container" dangerouslySetInnerHTML={{__html: articleView}}>
            
        </div>
    );
}

const mapStateToProps = state => {
return{
    articleView: state.articleView
}
}

export default connect(mapStateToProps, null)(BlogContent);