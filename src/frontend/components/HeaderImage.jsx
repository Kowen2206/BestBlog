import React from 'react';
import { connect } from 'react-redux';
import "../assets/styles/Moleculas/HeaderImage.scss"

const HeaderImage = ({Image})=>{
    return(

        <div id="anclaHeader" className="headerImage__container">
            <div className="headerImage__button">
            </div>
            <article className="headerImage__item">
                <section className="headerImage__image">
                    <img src={Image} alt=""/>
                </section>
                
            </article>
        </div>

    );
}

const mapStateToProps  = state => {
    return {articles: state.articles}
}

export default connect(mapStateToProps, null)(HeaderImage);