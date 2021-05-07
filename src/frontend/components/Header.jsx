import '../assets/styles/Organismos/Header.scss';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const Header = () =>{

    const [menu, useMenu] = useState(false);

    const handleTogle = () =>{
        console.log(menu)
        useMenu(!menu);
    }

    return(
        <div className="header__container">
            <a className="header_logo"><h1>BESTBLOG</h1></a>
            <div onClick={ ()=> handleTogle()} className="header__togleButton">
                <div className="header__togleButton__item"></div>
            </div>

            <nav className="header__nav header__nav-desktop">
                <ul>
                    <Link to="/Home"> <li>HOME</li> </Link>
                    <Link to="/Editor"> <li>CREA TU BLOG</li> </Link>
                    <Link to="/Login"> <li>REGISTRATE /LOGIN</li> </Link>
                    <Link to="/"> <li>ABOUT</li> </Link>
                </ul>
            </nav>

            {
               menu && 
               <nav onClick={ ()=> handleTogle()} className="header__nav">
                <ul>
                    <Link to="/Home"> <li>HOME</li> </Link>
                    <Link to="/Editor"> <li>CREA TU BLOG</li> </Link>
                    <Link to="/Login"> <li>REGISTRATE /LOGIN</li> </Link>
                    <Link to="/"> <li>ABOUT</li> </Link>
                </ul>
                </nav>
            }
            
        </div>
    );

}

export default Header;