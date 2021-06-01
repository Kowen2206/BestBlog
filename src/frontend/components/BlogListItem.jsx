import React from 'react'
import "../assets/styles/Moleculas/BlogList.scss";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


const imageURL = "https://scontent-qro1-1.xx.fbcdn.net/v/t1.6435-9/48379979_2024468410980028_1855760733292199936_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=174925&_nc_eui2=AeFaMXIWqOznEPjhgirxlv2lpLDRR1vtDGOksNFHW-0MYwxGIDQjgxiV4rbuwTFzjVQkaPg8XaTt6kUGi1tviUpw&_nc_ohc=_rhDjouV_DsAX8l2x2V&_nc_ht=scontent-qro1-1.xx&oh=6d46fcb1120dec664531b204a94b78a2&oe=60B359EF;" 

const BlogListItem = (props) =>{

    return(
    <Link to={`/Blog/${props._id}`} >
    <article className="blogList__item" onClick={()=> handleClickArticle()}>
                <a className="blogList__image__link"> 
                    <img src={props.ArticlePhoto} alt=""/>
                </a>
                <h1>{props.Title}</h1>
                <div className="blogList__content">
                    <a className="blogList__image__content" dangerouslySetInnerHTML={{__html: props.Preview}}>
                    </a>
                </div>
                <footer className="userInfo">
                    <div className="userInfo__image">
                        <img src={props.UserPhoto} alt=""/>
                    </div>
                    <span>{props.UserName} {props.Date}</span>
                </footer>
                
    </article>
    </Link>
    )
}

const mapStateToProps  = state => {
    return {articles: state.articles}
}



export default connect(mapStateToProps, null)(BlogListItem);