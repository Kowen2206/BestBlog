import React, {useEffect, useState} from 'react'

const LoginCard = () =>{

    const [registered, useRegister] = useState(true);

    const handleToggleForm = () =>{
        console.log("change");
        useRegister(!registered);
    }

    return (
        <div className="login__card"> 
            <h1>WRITE YOUR BLOG</h1>
            <div> New user? <div onClick={()=> handleToggleForm()}> {registered? "Create an account" : "Login"} </div></div>
            <form action="" onSubmit={e=>handleSession(e)}>
            {registered == false &&<>
                    <label htmlFor="name">Nombre de usuario</label>
                    <input type="text" name="name" id="NombreUsuario"/>
                    </>}
                    <label htmlFor="email">Correo</label>
                    <input name="email" id="Correo" type="text"/> 
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" id="Contraseña"/>
                    {!registered &&<>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" id="Contraseña"/>
                    </>}
                    <button className="contentLogin-card-submit">Continuar</button>            
            </form>
        </div>
    );
}

export default LoginCard;