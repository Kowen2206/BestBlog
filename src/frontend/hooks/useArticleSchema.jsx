import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { createArticle } from '../actions';

const useArticleSchema = ({data}) => {

   const [articleData, setArticleData] = useState({data: "No data"});
    setArticleData({
    Title: "undefined", 
    ArticleContent: "", 
    Preview: "", 
    UserName: "", 
    Date: "", 
    ArticlePhoto: "", 
    UserPhoto: "" 
    })

    return articleData;
}

export default (useArticleSchema)
