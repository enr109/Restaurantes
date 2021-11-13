import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { Producto } from "./Producto";
import { fetchSinToken } from "../helpers/fetch";



const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;





export const Productos = () => {

    const [resultado, setResultado] = useState([]);
    

    useEffect(() => {
        const consultarAPI = async () => {
    
            const resp = await fetchSinToken(`restaurants/`,{});
            setResultado(resp);
        }
        consultarAPI();
    }, []);

    
    return (
        <Container>
            {resultado.map((result) => (
                <Producto key={ result.slug} result={result} />
            ))}
            {/* <Producto
                resultado={ resultado }
            /> */}
        </Container>
    )
}
