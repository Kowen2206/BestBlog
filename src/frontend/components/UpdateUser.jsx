import React, { useState, useEffect } from 'react'
import closePng from '../assets/statics/images/close.png';
import '../assets/styles/Moleculas/UpdateUser.scss';
import '../assets/styles/Atomos/UploadImageButton.scss';
import { connect } from 'react-redux';
import { updateUserAction } from '../actions/index';
import useCreateImageUrlFromInput from '../hooks/useCreateImageUrlFromInput';

const UpdateUser = ({ updateUserAction, showConfig, user }) => {

    //rgb(80, 130, 191);
    const [imageUser, setimageUser] = useState(user.photo);

    const [form, setValues] = useState(
        {
            name: '',
            newPassword: '',
            photo: "",
            password: ''
        });

    const [formIsEmpty, setFormIsEmpty] = useState(false);

    useEffect(() => {
        let formValues = Object.values(form);
        let counter = 0;

        formValues.map(item => { item !== "" && item !== null ? counter += 1 : null; });
        counter !== 0 ? setFormIsEmpty(false) : setFormIsEmpty(true)

    }, [form]);

    const createImageUrl = useCreateImageUrlFromInput();

    const updateInput = event => {
        setValues({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleUserData = (e) => {
        e.preventDefault();
         if(!formIsEmpty && form.password !== "") updateUserAction({ ...form, id: user.id });
    }

    return (
        <div onClick={(e) => e.target.className === 'updateUser-container'? showConfig(false) : null } className='updateUser-container'>
            <div className='updateUser-wraper'>
                <img onClick={() => showConfig(false)} className='updateUser-close-button' src={closePng || ''} alt="" />
                <h1>
                    Cambia tus datos
                </h1>
                <form className='updateUser-form' onSubmit={e => handleUserData(e)} action="" encType='multipart/form'>
                    <label>Nuevo nombre de usuario</label>
                    <input name="name" onChange={e => updateInput(e)} placeholder={"Nombre de usuario"} type="text" />

                    <label>Nueva contraseña</label>
                    <input name='newPassword' onChange={e => updateInput(e)} placeholder="Ingresa tu contraseña" type="password" />

                    <label>Nueva contraseña</label>
                    <input pattern={form.newPassword} placeholder="Repite tu contraseña" type="password" />

                    <img src={imageUser || ""} alt={user.name} />

                    <label className="updateUser-ImageButton" htmlFor="Img"> 
                        <div className='ImageButton'>Cambiar foto</div> </label>
                    <input className="InputFile" accept="image/*" onChange={data => {
                        let url = createImageUrl(data);
                        setimageUser(url);
                        setValues({ ...form, photo: data.target.files[0] });
                    }} type='file' id="Img" name="Images" />

                    <label>Ingresa tu contraseña actual</label>
                    <input required={true} name='password' onChange={e => updateInput(e)} placeholder="Ingresa tu contraseña actual" type="password" />

                    <button className='updateUser-button' style={{ backgroundColor: formIsEmpty ? 'rgb(80, 130, 191)' : 'rgb(44, 95, 157)' }}>
                        Actualizar
                    </button>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    updateUserAction
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
