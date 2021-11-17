import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { Producto } from "./Producto";
import { fetchSinToken } from "../helpers/fetch";
import { mobile } from "../responsive";


const Container = styled.div``;
const ContainerImg = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

//Filtro

const FilterContainer = styled.div`
    display: flex;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;





export const Productos = () => {

    const [resultado, setResultado] = useState([]);
    const [tipo, setTipo] = useState([]);
    const [search, setsearch] = useState();

    useEffect(() => {
        const consultarAPI = async () => {
    
            const resp = await fetchSinToken(`restaurants/`,{});
            setResultado(resp);
            
            const tipo = await fetchSinToken(`food_types/`,{});
            setTipo(tipo);
        }
        consultarAPI();
    }, []);

    const filterrestaurantes = ():any => {
        if ( !search) {
            
            return resultado;
        } else {
            const filtered = resultado.filter( (rest:any) => rest.food_type.includes(search));
            
            return filtered;
        }

    }

    const handleChange = ({ target }:any)=> {
        const { name, value } = target;
        setsearch(value);
        
        
    }

    
    return (
        <Container>
            <FilterContainer>
                <Filter>
                    <FilterText>Tipo de comida</FilterText>
                    <Select onChange={ handleChange }>
                        <Option value="">Seleccione</Option>
                        { tipo.map((tipo:any) => (
                            <Option key={tipo.slug} value={ tipo.slug } >
                                { tipo.name }
                            </Option>
                        ))}
                    </Select>
                </Filter>
            </FilterContainer>
            
            <ContainerImg>
            {filterrestaurantes().map((result:any) => (
                <Producto key={ result.slug} result={result} />
            ))}
            
            </ContainerImg>
        </Container>
    )
}
