import React from 'react'
import { connect } from 'react-redux'
import  {showWindowMessage } from '../actions/index'

const MessageWindow = (props) => {

    const { Message, showWindowMessage } = props;

    
    return (
        <>
            {Message.message != "" &&
            <div className="wraper-window-container">
                <div className="window-message-container">
                    <h1>{Message.title}:</h1>
                    <p>
                        {Message.message}
                    </p>
                    { Message.message !== "Cargando..." && 
                    <button onClick={()=>{ 
                        showWindowMessage({message: "", title: ""})
                    }} className="window">
                        Continuar
                    </button>
                    }
                </div>
            </div>
            }
        </>
    );
}

const mapStateToProps = state => {
    return {
        Message: state.Message
    }
}

const mapDispatchToProps = {
    showWindowMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageWindow);