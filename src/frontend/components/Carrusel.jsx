import React, {useState} from 'react';
import { connect } from 'react-redux';
import "../assets/styles/Moleculas/Carrusel.scss"
import HeaderImage from './HeaderImage';

const Carrusel = (props)=>{

    const [indexImage, indexImageState] = useState(0);

    const handleIndexImage = (change) =>{
        
        indexImageState(

            change == "Next"? indexImage < props.articles.length - 1? indexImage + 1 : 0 
            : indexImage <= props.articles.length -1 && indexImage > 0? indexImage - 1 : props.articles.length -1

        );

        console.log(indexImage);
        console.log(props.articles.length);
    }

    return(

        <div className="carrusel__container">

            <div className="carrusel__buttonR" onClick={()=>{handleIndexImage("Next")}}>
                
            </div>

            <div className="carrusel__buttonL" onClick={()=>{handleIndexImage("Last")}}>

            </div>

            <HeaderImage Image={props.articles[indexImage].ArticlePhoto}/>

        </div>

    );
}

const mapStateToProps  = state => {
    return {articles: state.articles}
}

export default connect(mapStateToProps, null)(Carrusel);