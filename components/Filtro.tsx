import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchSinToken } from '../helpers/fetch';
import { mobile } from '../responsive';

const Container = styled.div``;

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

export const Filtro = () => {
  const [tipo, setTipo] = useState([]);
  useEffect(() => {
    const consultarAPI = async () => {
      const tipo = await fetchSinToken(`food_types/`,{});
      setTipo(tipo);
    }
    consultarAPI();
  }, []);

  const handleChange = ({ target }:any)=> {
    const { name, value } = target;

    console.log(name,value);
  }

    return (
        <Container>
            <FilterContainer>
              <Filter>
                <FilterText>Tipos de comida</FilterText>
                <Select onChange={ handleChange }>
                  
                  { tipo.map((tipo:any) => (
                    <Option key={tipo.slug} value={ tipo.slug } >
                      { tipo.name }
                    </Option>

                  ))}
                </Select>
              </Filter>
            </FilterContainer>
        </Container>
    )
}
