import React from 'react';
import { connect } from 'react-redux';
import "../assets/styles/Moleculas/Carrusel.scss"

const Carrusel = (props)=>{
    return(

        <div className="carrusel__container">

            <div className="carrusel__button">

            </div>

            <article className="carrusel__item">
                <section className="carrusel__image">
                    <img src={props.articles[1].ArticlePhoto} alt=""/>
                </section>
                <section className="carrusel__textCard">
                    <h1>{props.articles[1].Title}</h1>
                    <p dangerouslySetInnerHTML={{__html: props.articles[1].Preview}}>
                    
                    </p>
                </section>
            </article>
        </div>

    );
}

const mapStateToProps  = state => {
    return {articles: state.articles}
}

export default connect(mapStateToProps, null)(Carrusel);