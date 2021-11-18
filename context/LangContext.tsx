import React, { createContext, useState } from "react";
import { IntlProvider } from "react-intl";
import MensajesIngles from '../lang/en-US.json';
import MensajesEspañol from '../lang/es-MX.json';

interface props {
    children: JSX.Element | JSX.Element[]
}

const langContext = createContext({});

const LangContext = ({children}:props) => {
    
    /* let localdefecto;
    let mensajedefecto;
    const lang = localStorage.getItem('lang');

    if (lang === 'es-MX') {
        mensajedefecto = MensajesEspañol;
    } else if (lang === 'es-US') {
        mensajedefecto = MensajesIngles;
    } else {
        localdefecto = 'en-US';
        mensajedefecto = MensajesIngles;
    } */


    const [mensajes, setmensajes] = useState(MensajesIngles);
    const [local, setlocal] = useState('en-US');

    const establecerLenguaje = (lenguaje:any) => {
        switch (lenguaje){
            case 'es-MX':
                setmensajes(MensajesEspañol);
                setlocal('es-MX');
                localStorage.setItem('lang','es-Mx');
                break;
            case 'en-US':
                setmensajes(MensajesIngles);
                setlocal('en-US');
                localStorage.setItem('lang','en-US');
                break;
            default:
                setmensajes(MensajesIngles);
                setlocal('en-US');
                localStorage.setItem('lang','en-US');
        }

    }

    return (
        <langContext.Provider value={{establecerLenguaje: establecerLenguaje}}>
            <IntlProvider locale={local} messages={mensajes}>
            {children}
            </IntlProvider>
        </langContext.Provider>
    )
}

export {LangContext, langContext};
