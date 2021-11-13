import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import styled from "styled-components";
import { ComidaModal } from "../components/Modal/ComidaModal";
import { Navbar } from "../components/Navbar";
import { mobile } from "../responsive";
import { fetchSinToken, fetchUrl } from '../helpers/fetch';

const Container = styled.div`
`;

/* const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      },
      iconos:{
        cursor: 'pointer'
      }, 
      inputMaterial:{
        width: '100%'
      }
})) */

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

    const seleccionar=(comida) =>{
        setcomidaseleccionada(comida);
        onShowModal();
    }

    const peticionDelete = (comida:any) => {
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
                await fetchUrl(`food_types/`,slug,{},'DELETE');
                
                Swal.fire(
                    'Typo de comida',
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
        <Container>
            <Navbar/>
            <Button onClick={ onShowModal }>Insertar</Button>
            <Wrapper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Accion</TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map(comida=>(
                                <TableRow key={comida.slug}>
                                    <TableCell>{comida.slug}</TableCell>
                                    <TableCell>{comida.name}</TableCell>
                                    <TableCell>
                                        <Editar onClick={ () => seleccionar(comida) }>Editar</Editar>
                                        {/* <Editar onClick={ onShowModal }>Editar</Editar> */}
                                        <Eliminar onClick={()=>peticionDelete(comida)}>Eliminar</Eliminar>
                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Wrapper>
            <ComidaModal show={showModal} setShow={setShowModal} comidasele={comidaseleccionada} title={'Tipo de Comida'} peticionGet={ peticionGet }>
                <h2>Contenido</h2>
            </ComidaModal>
        </Container>
    )
};

export default Comida;
