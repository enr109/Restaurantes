import React, { useState, useEffect } from 'react';
import { fetchSinToken } from '../helpers/fetch';

const consultarAPI = async () => {
    
    const resp = await fetchSinToken(`restaurants/`);
    console.log(resp);
    
}



export const Restaurantes = () => {
    useEffect( () => {
        consultarAPI()
    },[]);
    return (
        <div>
            
        </div>
    )
}
