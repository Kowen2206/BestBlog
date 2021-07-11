import React, { useState, useEffect } from 'react'
import HeaderImage from './HeaderImage'
import { connect } from 'react-redux';
import { uploadImage } from '../actions/index'
import useCreateImageUrlFromInput from '../hooks/useCreateImageUrlFromInput';

const HeaderImageEditor = ({uploadImage, articlePhoto}) => {
    useEffect(()=>{
        let image = articlePhoto === ""? window.sessionStorage.getItem("articleImage")?window.sessionStorage.getItem("articleImage"): articlePhoto : articlePhoto
       if (articlePhoto === "") {
           if(window.sessionStorage.getItem("articleImage")){
            image = window.sessionStorage.getItem("articleImage")
           }else{
            image = articlePhoto
           }
       }else{
        image = articlePhoto
        window.sessionStorage.setItem("articleImage", articlePhoto);
       }
       
        SetHeaderArticleImage(image)
    },[articlePhoto]);

    const [HeaderArticleImage, SetHeaderArticleImage] = useState(articlePhoto);
    const createImageURL = useCreateImageUrlFromInput();

    const handleImage = data => {
        uploadImage({key: "articleImage", photo: data.target.files[0]});
        let image = createImageURL(data);
        SetHeaderArticleImage(image);
    }

    return (
        <div className="HeaderImageEditor">
            {HeaderArticleImage !== "" && <HeaderImage Image={HeaderArticleImage} />}

            <div className="Editorcontainer_item">Selecciona una imagen de portada para tu articulo</div>
            <label className="Editorcontainer_item ImageButton" htmlFor="Image">{HeaderArticleImage !== "" ? "Subir una imagen" : "Cambiar imagen"}</label>
            <input className="InputFile Editorcontainer_item" accept="image/*" onChange={ data => handleImage(data)}
            type="file" id="Image" name="Image" />
            <div className="Editorcontainer_item" > {HeaderArticleImage === "" ? "Debes Seleccionar una imagen" : ""}</div>
        </div>
    );
}

const mapDispatchToProps = {
    uploadImage
}

export default connect(null, mapDispatchToProps)(HeaderImageEditor)

