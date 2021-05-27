import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { registerhttp, sigInhttp } from '../actions'

const LoginCard = (props) => {
    const [registered, useRegister] = useState(true);

    const handleToggleForm = () => {
        console.log("change");
        useRegister(!registered);
    }

    const [form, setValues] = useState(
        {
            email: '',
            name: '',
            password: ''
        });

    const updateInput = event => {
        setValues({
            ...form,
            [event.target.name]: event.target.value
        });

        console.log(form);
    };

    const handleForm = e => {
        // registered? props.sigInhttp() : props.registerhttp();

        e.preventDefault();
        console.log("FORM")
        registered ? props.sigInhttp('/', form) : props.registerhttp('/Login', form);
        //registered? console.log("registered") : console.log("no_registered");
    }

    return (
        <div className="login__card">
            <h1>Escribe tu blog</h1>
            <div> Eres nuevo? <div className="login__Link" onClick={() => handleToggleForm()}> {registered ? "Create an account" : "Login"} </div></div>
            <form action="" onSubmit={e => handleForm(e)}>
                {registered == false && <>
                    <label htmlFor="name">Nombre de usuario</label>
                    <input required={true} onChange={updateInput} type="text" name="name" id="NombreUsuario" />
                </>}
                <label htmlFor="email">Correo</label>
                <input required={true} onChange={updateInput} name="email" id="Correo" type="text" />
                <label required={true} htmlFor="password">Contraseña</label>
                <input required={true} onChange={updateInput} type="password" name="password" id="Contraseña" />
                {!registered && <>
                    <label htmlFor="password">Contraseña</label>
                    <input required={true} onChange={updateInput} type="password" name="password" id="Contraseña" />
                    <label className="ImageButton" htmlFor="Image">Selecciona Una foto de perfil</label>
                    <input required={true} className="InputFile" onChange={data => setValues({ ...form, photo: data.target.files[0]})}
                    type="file" id="Image" name="Image" />
                    <br/>
                </>}
                <button className="contentLogin-card-submit">Continuar</button>
            </form>
        </div>
    );
}

const mapDispatchToProps = {
    registerhttp,
    sigInhttp
}

export default connect(null, mapDispatchToProps)(LoginCard);