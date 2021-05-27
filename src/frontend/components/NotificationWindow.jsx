import React from 'react';

const NotificationWindow = ({mesage}) =>{

    return(
    <div className="NotificationWindow_container">
        <div className="NotificationWindow_content">
            <img className="NotificationWindow_icon" src="" alt="" />
            <span className="NotificationWindow_message"> Mensaje de alerta </span>
        </div>
    </div>
    );
}

export default NotificationWindow;