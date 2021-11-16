/* const baseUrl = process.env.REACT_APP_API_URL; */
const baseUrl = 'https://tellurium.behuns.com/api';


export const fetchSinToken = async( endpoint:any, data:any, method = 'GET' ) => {
    

    const url = `${ baseUrl }/${ endpoint }`;
    /* console.log( url); */

    if ( method === 'GET' ) {
        const resp = await fetch( url,{
            method,
            
        });
        return await resp.json();
    } else {
        const resp = await fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });

        return await resp.json();
    }

}


export const fetchImagen = async( endpoint:any, data:any, method = 'GET' ) => {
    console.log(JSON.stringify(data));

    const url = `${ baseUrl }/${ endpoint }`;

    const resp = await fetch( url,{
        method,
        headers:{
            'Content-type': 'multipart/form-data' 
            
        },
        body: data
        
    });

    return await resp.json();

}


export const fetchUrl = async(endpoint:any, id:any, data:any,  method = 'GET' ) => {
    const url = `${ baseUrl }/${ endpoint }${id}/`;
    console.log(url);

    if ( method === 'GET' ) {
        const resp = await fetch( url,{
            method,
            
        });
        return await resp.json();
    } else {
        const resp = await fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        return await resp.json();
    }
    
}