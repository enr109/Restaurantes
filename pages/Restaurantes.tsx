import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';
import { mobile } from '../responsive';
import { fetchSinToken, fetcheliminar } from '../helpers/fetch';
import { RestauranteModal } from '../components/Modal/RestauranteModal';
import { Restaurante } from '../components/Interfaces/Productos';
import { LangContext } from '../context/LangContext';
import { FormattedMessage } from "react-intl";

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const Button = styled.button`
  width: 23%;
  margin: 7% 2% -7% 5%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Editar = styled.button`
    width: auto;
    border: none;
    padding: 15px 27px;
    background-color: teal;
    color: white;
    cursor: pointer;
`;

const Eliminar = styled.button`
    width: auto;
    border: none;
    padding: 15px 20px;
    background-color: #EB2575;
    color: white;
    cursor: pointer;
`;

const Image = styled.img`
    height: 5%;
    width: 100%;
    z-index: 2;
`;


const Restaurantes = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalUP, setShowModalUP] = useState(false);
    const [data, setData] = useState([]);
    const [restauranteseleccionado, setrestauranteseleccionado] = useState({
        slug: '',
        name: '',
        descripcion: '',
        logo: '',
        rating: 0,
        food_type: ''
    });

    const onShowModal = () => {
        setShowModal(true);
    }

    const onShowModalU = () => {
        setShowModalUP(true);

    }

    const peticionGet = async () => {
        const resp = await fetchSinToken(`restaurants/`,{});
        setData(resp);
    }

    const seleccionar=( rest:any ) => {
        setrestauranteseleccionado(rest);
        onShowModalU();
    }

    const peticionDelete = (rest:any) => {
        const { name, slug } = rest;
        Swal.fire({
            title: '¿ Borrar Restaurante ?',
            text: `Esta a punto de borrar a ${name}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrarlo'
        }).then(async(result) => {
            if (result.isConfirmed) {
                await fetcheliminar(`restaurants/`,slug,{},'DELETE');

                Swal.fire(
                    'Restaurante',
                    `${ name } fue eliminado correctamente`,
                    'success'
                );
                
                
                peticionGet();
                
            }
        })
    }

    useEffect(() => {
        peticionGet();
        
    }, [])

    return (
        <LangContext>
        <Container>
            <Navbar/>
            <Button onClick={ onShowModal }>
                <FormattedMessage
                    id="app.insert"
                    defaultMessage="Insert"
                />
            </Button>
            <Wrapper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <FormattedMessage
                                        id="app.id"
                                        defaultMessage="ID"
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage
                                        id="app.name"
                                        defaultMessage="Name"
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage
                                        id="app.description"
                                        defaultMessage="Description"
                                    />
                                </TableCell>
                                <TableCell>Logo</TableCell>
                                <TableCell>
                                    <FormattedMessage
                                        id="app.classification"
                                        defaultMessage="Classification"
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage
                                        id="app.foodtype"
                                        defaultMessage="Food type"
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage
                                        id="app.action"
                                        defaultMessage="Action"
                                    />
                                </TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((rest:Restaurante)=>(
                                <TableRow key={rest.slug}>
                                    <TableCell>{rest.slug}</TableCell>
                                    <TableCell>{rest.name}</TableCell>
                                    <TableCell>{rest.description}</TableCell>
                                    <TableCell>
                                        <Image src={rest.logo}/>
                                    </TableCell>
                                    <TableCell>{rest.rating}</TableCell>
                                    <TableCell>{rest.food_type}</TableCell>
                                    <TableCell>
                                        <Editar onClick={ () => seleccionar(rest) }>
                                            <FormattedMessage
                                                id="app.edit"
                                                defaultMessage="Edit"
                                            />
                                        </Editar>
                                        {/* <Editar onClick={ onShowModal }>Editar</Editar> */}
                                        <Eliminar onClick={()=>peticionDelete(rest)}>
                                            <FormattedMessage
                                                id="app.remove"
                                                defaultMessage="Remove"
                                            />
                                        </Eliminar>
                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Wrapper>
            <RestauranteModal 
                show={showModal} 
                setShow={setShowModal}
                showU={showModalUP}
                setShowU={setShowModalUP} 
                restasele={restauranteseleccionado} 
                restaset={setrestauranteseleccionado} 
                peticionGet={ peticionGet }>
                <h2>Contenido</h2>
            </RestauranteModal>
        </Container>
        </LangContext>
    )
}

export default Restaurantes;
