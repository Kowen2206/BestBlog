import React from 'react';

const UserHeader = ({Image, Name}) =>{
    return(
        <div className="userHeader__container">
            <div className="trashBlock">
                
            </div>

            <div>
                <h1>{Name}</h1>
            </div>
            <div className="userHeader__imageContainer">
                    {Image != "" && <img src={Image} alt="" />}
            </div>
        </div>
    );
}

export default UserHeader;