import React, {useState} from 'react'
import "../assets/styles/Moleculas/BlogList.scss";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {deleteArticle} from '../actions';

const BlogListItem = (props) =>{

const [options, optionsState] = useState(false);

const handleClickOptions = (action) =>{

    console.log(action)
    console.log(props._id)
    action == "Eliminar"?
    props.deleteArticle(props._id)
    : window.location.href = `/Editor/${props._id}`;

}

    return(
  
    <article style={{order: props.orderIndex}} className="blogListItem">
                {props.userId == props.UserId?<div className="blogListItem__butonOptions" onClick={()=> optionsState(!options)}>

                    <div className="blogListItem__OptionsDecoration">

                    </div>

                     
                    {options &&<div  className="blogListItem_options">
                        <ul>
                            <li onClick={() => handleClickOptions("Eliminar")}>Eliminar</li>
                        </ul>
                        <ul>
                            <li onClick={() => handleClickOptions("Editar")}>Editar</li>
                        </ul>
                    </div> }

                </div> : <></>}
                <Link className="linkItem" to={`/Blog/${props._id}`}>
                
                <a className="blogListItem__image__link"> 
                    <img src={props.ArticlePhoto} alt=""/>
                </a>
                <h1>{props.Title}</h1>
                <div className="blogListItem__content">
                    <a className="blogListItem__image__content" dangerouslySetInnerHTML={{__html: props.Preview}}>
                    </a>
                </div>
                
                </Link>
                <Link className="linkItem" to={`/Profile/${props.UserId}`}>
                <footer className="userInfo">
                    <div className="userInfo__image">
                        <img src={props.UserPhoto} alt=""/>
                    </div>
                    <span>{props.UserName} {props.Date}</span>
                </footer>
                </Link>
    </article>
    )
}

const mapStateToProps  = state => {
    return {
        articles: state.articles,
        userId: state.user.id
    }
}

const mapDispatchToProps = {
    deleteArticle
}


export default connect(mapStateToProps, mapDispatchToProps)(BlogListItem);