import React, { useState } from 'react';
import configPng from '../assets/statics/images/configuraciones.png'
import UpdateUser from './UpdateUser';

const UserHeader = ({Image, Name, Id, IdParams}) =>{

    const [showConfig, setshowConfig] = useState(false);
    return(
        <>
            <div className="userHeader__container">
                <div className="trashBlock">
                {Id === IdParams && <img src={configPng} onClick={()=> setshowConfig(true)} alt="" />}
                </div>
                <div>
                    <h1>{Name}</h1>
                </div>
                <div className="userHeader__imageContainer">
                        {Image != "" && <img onClick={()=> Id === IdParams && setshowConfig(true)} src={Image} alt="" />}
                </div>
            </div>
            { showConfig &&  <UpdateUser showConfig={setshowConfig} Image={Image} Name={Name} /> }
        </>
    );
}

export default UserHeader;