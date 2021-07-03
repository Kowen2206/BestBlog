import React from 'react'
import { connect } from 'react-redux'
import  {showWindowError } from '../actions/index'

const ErrorWindow = (props) => {

    const { Error, showWindowError } = props;

    return (
        <>
            {Error[0] && <div className="window-error-container">
                <h1>ERROR:</h1>
                <p>
                    {Error[1]}
                </p>
                <button onClick={()=>{ 

                    showWindowError([false, "Error"])

                 }} className="window">
                    Continuar
                </button>
            </div>}
        </>
    );
}

const mapStateToProps = state => {
    return {
        Error: state.Error
    }
}

const mapDispatchToProps = {
    showWindowError
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorWindow);