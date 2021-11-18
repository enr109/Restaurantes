import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import Head from 'next/head'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import styled from "styled-components";
import { ComidaModal } from "../components/Modal/ComidaModal";
import { Navbar } from "../components/Navbar";
import { mobile } from "../responsive";
import { fetchSinToken, fetcheliminar } from '../helpers/fetch';
import { Food_type } from '../components/Interfaces/Productos';
import { LangContext } from '../context/LangContext';
import { FormattedMessage } from "react-intl";

const Container = styled.div`
`;



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

const Comida = () => {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const [comidaseleccionada, setcomidaseleccionada] = useState({
        slug: '',
        name: ''
    });


    const onShowModal = () => {
        setShowModal(true);
    };

    const peticionGet = async () => {
        const resp = await fetchSinToken(`food_types/`,{});
        setData(resp);
    }

    const seleccionar=(comida:Food_type) =>{
        setcomidaseleccionada(comida);
        onShowModal();
    }

    const peticionDelete = (comida:Food_type) => {
        const { name, slug } = comida;
        Swal.fire({
            title: '¿ Borrar Tipo de Comida ?',
            text: `Esta a punto de borrar a ${name}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrarlo'
        }).then(async(result) => {
            if (result.isConfirmed) {
                await fetcheliminar(`food_types/`,slug,{},'DELETE');
                
                Swal.fire(
                    'Tipo de comida',
                    `${ comida.name } fue eliminado correctamente`,
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
            <Head>
                <title>Tipos de Comida</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
                                        id="app.action"
                                        defaultMessage="Action"
                                    />
                                </TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((comida:Food_type)=>(
                                <TableRow key={comida.slug}>
                                    <TableCell>{comida.slug}</TableCell>
                                    <TableCell>{comida.name}</TableCell>
                                    <TableCell>
                                        <Editar onClick={ () => seleccionar(comida) }>
                                            <FormattedMessage
                                                id="app.edit"
                                                defaultMessage="Edit"
                                            />
                                        </Editar>
                                        {/* <Editar onClick={ onShowModal }>Editar</Editar> */}
                                        <Eliminar onClick={()=>peticionDelete(comida)}>
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
            <ComidaModal show={showModal} setShow={setShowModal} comidasele={comidaseleccionada} comidaset={setcomidaseleccionada} title={'Tipo de Comida'} peticionGet={ peticionGet }>
                <h2>Contenido</h2>
            </ComidaModal>
        </Container>
        </LangContext>
    )
};

export default Comida;
