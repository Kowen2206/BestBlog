import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "../assets/styles/Moleculas/Carrusel.scss";
import HeaderImage from './HeaderImage';

const Carrusel = (props) => {

    const [indexImage, setIndexImage] = useState(0);

    const handleIndexImage = (change) => {

        if(change == "Next"){
            setIndexImage(indexImage < props.articles.length - 1 ?
                 indexImage + 1 : 0
            )
        }else{
            setIndexImage(
                indexImage <= props.articles.length - 1 && indexImage > 0 ? 
                indexImage - 1 : props.articles.length - 1
            )
        }
    }

    return (
        <div className="carrusel__container">
            <Link style={{ color: "black" }} to={props.articles.length > 0 ? `/Blog/${props.articles[indexImage]._id}` : "/Home"}>
                <h1>{props.articles.length > 0 ? props.articles[indexImage].Title : ""}</h1>
            </Link>
            <div className="carrusel__buttonR" onClick={() => { handleIndexImage("Next") }}></div>
            <div className="carrusel__buttonL" onClick={() => { handleIndexImage("Last") }}></div>
            <HeaderImage Image={props.articles.length > 0 ? props.articles[indexImage].ArticlePhoto : ""} />
        </div>
    );
}

export default Carrusel;