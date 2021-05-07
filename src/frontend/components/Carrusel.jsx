import React from 'react';
import "../assets/styles/Moleculas/Carrusel.scss"

const Carrusel = ()=>{
    return(

        <div className="carrusel__container">

            <div className="carrusel__button">

            </div>

            <article className="carrusel__item">
                <section className="carrusel__image">
                    <img src="https://img.lalr.co/cms/2020/01/29165223/platzi-2.jpg?size=xl" alt=""/>
                </section>
                <section className="carrusel__textCard">
                    <h1>¿Platzi funciona?</h1>
                    <p>
                    Este es un contenido random pero en un futuro muy cercano (espero que es esta semana), sera real. Este es un contenido random pero en
                     un futuro muy cercano (espero que es esta semana), sera real. Este es un contenido random pero en un futuro muy cercano...
                    </p>
                </section>
            </article>
        </div>

    );
}

export default Carrusel;