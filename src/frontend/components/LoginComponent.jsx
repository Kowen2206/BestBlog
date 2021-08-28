import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { registerhttp, sigInhttp } from '../actions'
import userImageDefault from '../assets/statics/images/programmer.png';
import useCreateImageUrlFromInput from '../hooks/useCreateImageUrlFromInput';
const LoginComponent = (props) => {
    const [registered, useRegister] = useState(true);
    const [imageUser, setimageUser] = useState(userImageDefault);

    const createImageUrl = useCreateImageUrlFromInput();

    const handleToggleForm = () => {
        useRegister(!registered);
    }

    const [form, setValues] = useState(
        {
            email: '',
            name: '',
            password: '',
            photo: ""
        });

    const updateInput = event => {
        setValues({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleForm = e => {
        e.preventDefault();

        if(!registered){
            if(imageUser !== userImageDefault){
                 props.registerhttp('/Login', form);
            }
        }else{
           props.sigInhttp('/', form) 
        }
        
        
    }

    return (
        <div className="login__card">
            <h1>Escribe tu blog</h1>
            <div> {registered ? "¿Eres nuevo?" : "¿Ya tienes una cuenta?"} <div className="login__Link" onClick={() => handleToggleForm()}> {registered ? "Crea una cuenta" : "Inicia sesión"} </div></div>
            <form onSubmit={e => handleForm(e)}>
                {registered == false && <>
                    <label htmlFor="name">Nombre de usuario</label>
                    <input minLength="4" required={true} onChange={updateInput} type="text" name="name" id="NombreUsuario" />
                </>}
                <label htmlFor="email">Correo</label>
                <input required={true} onChange={updateInput} name="email" id="Correo" type="email" />
                <label required={true} htmlFor="password">Contraseña</label>
                <input required={true} onChange={updateInput} type="password" name="password" id="Contraseña" />
                {!registered && <>

                    <label htmlFor="password"> Repite tu contraseña</label>
                    <input pattern={form.password} required={true} title="Las contraseñas no coinciden" type="password" name="password" id="Contraseña" />
                    <img className="loginCard_UserImagePreview" src={imageUser} alt="" />
                    <span>{imageUser !== userImageDefault? form.photo.name : "Debes subir una imagen"}</span>
                    <label className="ImageButton" htmlFor="Image"> Cambiar foto de perfil </label>
                    <input required={true} className="InputFile" accept="image/*" onChange={data => {
                        let url = createImageUrl(data);
                        setimageUser(url);
                        setValues({ ...form, photo: data.target.files[0]});
                    }}
                    type="file" id="Image" name="Image" />
                    <br/>

                </>}
                <button className="contentLogin-card-submit"> {registered ? "Continuar" : "Registrate"} </button>
            </form>
        </div>
    );
}

const mapDispatchToProps = {
    registerhttp,
    sigInhttp
}

export default connect(null, mapDispatchToProps)(LoginComponent);