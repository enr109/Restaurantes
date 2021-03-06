import { makeStyles, TextField, Modal, Button } from '@material-ui/core';
import React,{ useState } from 'react'
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { fetchSinToken, fetchUrl } from '../../helpers/fetch';


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
    const { show, setShow, comidasele, comidaset, title, children, peticionGet,...rest } = props;
    const [tipocomida, settipocomida] = useState({
        name: ''
    })
    
    /* console.log(comidasele.slug); */
    const onClose = () => setShow(false);

    const limpiar = () => comidaset({
        slug: '',
        name: ''
    });

    const todoOk = () => {
        return(tipocomida.name.length > 0 ) ? true : false;
    }

    const onsubmit = async(ev:any) => {
        ev.preventDefault();
        const { slug } = comidasele;
        const { name } = tipocomida;

        if (comidasele.slug) {
            // Actualizar
            const ok = await fetchUrl(`food_types/`,slug,{ name },'PUT');
            
            if ( ok ) {
                Swal.fire('Actualizado', 'Actualizado Correctamente', 'success');   
            }
            onClose();
            peticionGet();
            limpiar();
        } else {
            
            const ok = await fetchSinToken('/food_types/',{ name }, 'POST');
            if ( ok ) {
                Swal.fire('Registro', 'Registrado Correctamente', 'success');
            }
            onClose();
            peticionGet();
        }

        

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
                
                <TextField placeholder="Ingrese el tipo de comida" name="name" /* value={ (comidasele.slug)?tipocomida.name:comidasele.name  } */ onChange={ handleChange } className={styles.inputMaterial }/>
                <br/><br/>
                <div>
                    <Button 
                        variant="contained"
                        disabled={ !todoOk() } 
                        onClick={ onsubmit } 
                        color="primary"
                        >Agregar
                    </Button>
                    
                    
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
