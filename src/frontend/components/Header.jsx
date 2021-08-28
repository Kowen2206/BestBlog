import '../assets/styles/Organismos/Header.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LogOut } from '../actions'

const Header = (props) => {


    const [menu, useMenu] = useState(false);

    const handleTogle = () => {
        console.log(menu)
        useMenu(!menu);
    }

    const handleLogOut = () => {
        console.log("logout")
        props.LogOut();
        document.cookie = "email=";
        document.cookie = "name=";
        document.cookie = "id=";
        document.cookie = "token=";
        document.cookie = "photo=";
        window.location.href = "/";
    }

    return (
        <header className="header__container">
            <Link to="/Home" className="header_logo"><h1>BESTBLOG</h1></Link>
            <div className="header__togleButton">
                <div onClick={() => handleTogle()} className="header__togleButton__item"></div>
            </div>

            <nav className="header__nav header__nav-desktop">
                <ul>
                    <Link to="/Home"> <li>HOME</li> </Link>
                    <Link to="/Editor/Nuevo"> <li>CREA TU BLOG</li> </Link>
                    {props.session &&
                     <Link to={`/Profile/${props.userId}`}>
                         <li>PERFIL</li> 
                    </Link>}
                    {props.session ? 
                    <a href="#" onClick={() => { handleLogOut(); }}> 
                    <li>LogOut</li> 
                    </a> : 
                    <Link to="/Login">
                         <li>REGISTRATE /LOGIN</li>
                     </Link>}
                    <Link to="/"> <li>ABOUT</li> </Link>
                </ul>
            </nav>

            {
                menu &&
                <nav onClick={() => handleTogle()} className="header__nav">
                    <ul>
                        <Link to="/Home"> <li>HOME</li> </Link>
                        <Link to="/Editor/Nuevor"> <li>{props.session? "CREAR ARTICULO" : "CREA UN BLOG"}</li> </Link>
                        {props.session && 
                        <Link to={`/Profile/${props.userId}`}> <li>PERFIL</li> </Link>}
                        {props.session ? 
                        <Link onClick={handleLogOut} to="/"> <li>LogOut</li> </Link> : 
                        <Link to="/Login"> <li>REGISTRATE /LOGIN</li> </Link>}
                        <Link to="/"> <li>ABOUT</li> </Link>
                    </ul>
                </nav>
            }

        </header>
    );

}

const mapStateToProps = state => {
    return {
        session: state.user.session,
        userId: state.user.id
    }
}

const mapDispatchToProps = {
    LogOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);