import React, { useContext } from "react";
import styled from 'styled-components';
import { mobile } from '../responsive';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { LangContext,langContext } from "../context/LangContext";


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Href = styled.a`

`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const Bandera = styled.button`
  border: none;
  margin-left: 1%;
  background-color: white;
  ${mobile({ display: "none" })}
`;
const Image = styled.img`
  cursor: pointer;
  width: 30px;
`;


const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Ahref = styled.a``;

export const Navbar = () => {
  const { establecerLenguaje }:any = useContext(langContext);
  /* console.log(idioma.establecerLenguaje()); */
  
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Bandera onClick={() => establecerLenguaje('es-MX')}>
                      <Image src="https://i.ibb.co/ZXwkgSf/mejico.png"/>
                    </Bandera>
                    <Bandera onClick={() => establecerLenguaje('en-US')}>
                      <Image src="https://i.ibb.co/F6fcn0N/unidos.png"/>
                    </Bandera>
                    
                </Left>
                <Center>
                    <Logo>ROCKETHUB</Logo>
                </Center>
                <Right>
                    <MenuItem>
                      <Ahref href="/">
                        <FormattedMessage 
                            id="app.initiation"
                            defaultMessage="Home"
                        />
                      </Ahref>
                    </MenuItem>
                    <MenuItem>
                      <Ahref href="/Comida">
                        <FormattedMessage 
                            id="app.foodtype"
                            defaultMessage="Food type"
                        />
                      </Ahref>
                    </MenuItem>
                    <MenuItem>
                      
                      <Ahref href="/Restaurantes">
                        <FormattedMessage 
                          id="app.restaurants"
                          defaultMessage="Restaurants"
                        />
                      </Ahref>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}
