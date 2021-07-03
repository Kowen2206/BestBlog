import React from 'react'

const useGeDate = () => {

   const getDate = () =>{
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        return hoy.toLocaleDateString();
    }

    return getDate;
    
}

export default useGeDate
