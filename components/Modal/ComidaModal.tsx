import { makeStyles, TextField, Modal, Button } from '@material-ui/core';
import React,{ useState } from 'react'
import styled from 'styled-components';
import { fetchSinToken } from '../../helpers/fetch';


const useStyles = makeStyles((theme) => ({
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
}));


export const ComidaModal = (props:any) => {
    
    const styles= useStyles();
    const { show, setShow, comidasele, title, children, peticionGet,...rest } = props;
    const [tipocomida, settipocomida] = useState({
        name: ''
    })
    
    console.log(comidasele);
    const onClose = () => setShow(false);

    const onsubmit = async(ev:any) => {
        ev.preventDefault();

        const { name } = tipocomida;
        

        const resp = await fetchSinToken('/food_types/',{ name }, 'POST');
        console.log(resp);
        onClose();
        peticionGet();
    }

    const handleChange = ({ target }:any) => {
        const {name, value } = target;
        settipocomida({
            ...tipocomida,
            [name]: value
        })
    }
    
    const bodyInsertar = (
        <div className={styles.modal}>
                <h3>{title}</h3>
                
                <TextField placeholder="Ingrese el tipo de comida" name="name" value={ comidasele.name } onChange={ handleChange } className={styles.inputMaterial }/>
                <br/><br/>
                <div align="right">
                    <Button variant="contained" onClick={ onsubmit } color="primary">Insertar</Button>
                    <Button variant="contained" onClick={ onsubmit } color="primary">Editar</Button>
                    
                    
                    <Button variant="contained" onClick={ onClose }  color="secondary">Cancelar</Button>
                </div>
    
        </div>
    );
    return (
        <Modal open={show} >
            
            {bodyInsertar}
        </Modal>
    )
}
