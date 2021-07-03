import React, { useState, useEffect } from 'react'
import HeaderImage from './HeaderImage'
import { connect } from 'react-redux';
import { uploadImage } from '../actions/index'
import useCreateImageUrlFromInput from '../hooks/useCreateImageUrlFromInput';

const HeaderImageEditor = (props) => {
    useEffect(()=>{
        SetHeaderArticleImage(window.sessionStorage.getItem("articleImage")?window.sessionStorage.getItem("articleImage"):"")
    },[]);

    const [HeaderArticleImage, SetHeaderArticleImage] = useState("");
    const createImageURL = useCreateImageUrlFromInput();

    return (
        <div className="HeaderImageEditor">
            {HeaderArticleImage != "" && <HeaderImage Image={HeaderArticleImage} />}

            <div className="Editorcontainer_item">Selecciona una imagen de portada para tu articulo</div>
            <label className="Editorcontainer_item ImageButton" htmlFor="Image">{HeaderArticleImage == "" ? "Subir una imagen" : "Cambiar imagen"}</label>
            <input className="InputFile Editorcontainer_item" onChange={data => {
                props.uploadImage({key: "articleImage", photo: data.target.files[0]});
                let image = createImageURL(data);
                SetHeaderArticleImage(image);

            }
            }
            type="file" id="Image" name="Image" />
            <div className="Editorcontainer_item" > {HeaderArticleImage == "" ? "Debes Seleccionar una imagen" : HeaderArticleImage.name}</div>
        </div>
    );
}

const mapDispatchToProps = {
    uploadImage
}

export default connect(null, mapDispatchToProps)(HeaderImageEditor)

