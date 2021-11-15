import { makeStyles, TextField, Modal, Button, Checkbox, FormGroup, FormControlLabel, Input } from '@material-ui/core';
import React,{ useState, useEffect } from 'react'
import styled from 'styled-components';
import { fetchSinToken, fetchUrl, fetchImagen } from '../../helpers/fetch';



const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      },
      textField: {
          marginTop: '5%',
          width: '48%',
          marginRight: '2%'
      },
      button: {
          marginTop:'5%'
      },
      iconos:{
        cursor: 'pointer'
      }, 
      inputMaterial:{
        width: '100%'
      }
}));


export const RestauranteModal = (props:any) => {
    
    const styles= useStyles();
    const { show, setShow, restasele, restaset, children, peticionGet,...rest } = props;
    const [tipocomida, settipocomida] = useState([]);
    const [check, setcheck] = useState({
        food_type:[]
    });
    const [archivo, setarchivo] = useState({ logo:null});
    const [restaurante, setRestaurante] = useState({
        name:'',
        description:'',
        /* file: null, */
        rating:0,
    });

    const consultatipo = async () => {
        const resp = await  fetchSinToken(`food_types/`,{});
        settipocomida(resp);

    }

    useEffect(() => {
        consultatipo();
    }, [])
    
    /* console.log(comidasele.slug); */
    const onClose = () => setShow(false);

    const limpiar = () => restaset({
        slug: '',
        name: ''
    });

    const onsubmit = async(ev:any) => {
        ev.preventDefault();
        const logo = new FormData();
        const { slug } = restasele;
        const { name, description, rating } = restaurante;
        const { food_type } = check;
        logo.append("logo",archivo);
        /* console.log(archivo.logo) */
        /* formdata.append("name",name);
        formdata.append("description",description);
        formdata.append("rating", rating);
        formdata.append("food_type", food_type); */
        
        

        /* console.log(formdata); */
        

        if (slug) {
            // Actualizar
            const resp = await fetchUrl(`food_types/`,slug,{ name },'PUT');
            console.log(resp);
            onClose();
            peticionGet();
            limpiar();
        } else {
            
            const resp = await fetchImagen('restaurants/',{name,description,rating,food_type},logo, 'POST');
            console.log(resp);
            onClose();
            peticionGet();
        }

        

    }
    const ChangeCom = ({ target }:any) => {
        const {name, value} = target;
        setcheck({
            
            'food_type': [value]
        });

        
    }
    const handleChange = ({ target }:any) => {
        const {name, value } = target;
        
        setRestaurante({
            ...restaurante,
            [name]: value
        });

        /* console.log( restaurante); */

        
    }

    const changeimagen = ({target}:any) => {
        setarchivo(target.logo);
        console.log(target);
        
    }
    
    const handfile = (e) =>{
        /* console.log(e.target.files,'$$$$');
        console.log(e.target.files[0], '$$$$$') */

        let logo = e.target.files[0]
        setarchivo({'logo':logo})
        console.log(archivo.logo +'$$$')
    }
    const bodyInsertar = (
        <div className={styles.modal}>
                <h3>Agrgar Restaurante</h3>
                
                <TextField  
                    name="name" 
                    label="Nombre" /* value={ (comidasele.slug)?tipocomida.name:comidasele.name  } */ 
                    onChange={ handleChange } 
                    className={styles.textField }/>
                
                <TextField  
                    name="description" 
                    label="Descripcion"  
                    onChange={ handleChange } 
                    className={styles.textField }/>
                <TextField 
                    name="rating" 
                    label="Clasificación"  
                    onChange={ handleChange }
                    type="number" 
                    className={styles.textField }/>
                <Input type="file" name="file" onChange={ (e) => handfile(e) }/>
                <div>
                    <FormGroup row>
                        {tipocomida.map(tipo => (
                            
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value={tipo.slug} 
                                        onChange={ ChangeCom }
                                        name="foot_type"
                                        />
                                }
                                label={tipo.name}
                            />
                        ))}
                        

                    </FormGroup>
                    
                </div>
                

                <div align="right">
                    <Button variant="contained" onClick={ onsubmit } color="primary" className={styles.button }>Agregar</Button>
                    
                    
                    <Button variant="contained" onClick={ onClose }  color="secondary" className={styles.button }>Cancelar</Button>
                </div>
    
        </div>
    );
    return (
        <Modal open={show} >
            
            {bodyInsertar}
        </Modal>
    )
}
