import React,{ useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Navbar } from '../../components/Navbar';
import { fetchSinToken } from '../../helpers/fetch';
import { mobile } from '../../responsive';
import { Remove } from '@material-ui/icons';
import { Button, makeStyles, TextField } from '@material-ui/core';


const Container = styled.div``;

const useStyles = makeStyles((theme) => ({
  
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
}));

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 30px;
`;

const Tipo = styled.span`
    font-weight: 100;
    font-size: 30px;
    margin: 20px 0px;
    
`;
const Titulo = styled.h1`
    
    font-size: 20px;
`;
const Agregar = styled.h1`
  font-size: 20px;
  text-align: center;
`;




const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Form = styled.form`
  width: 100%;
  background-color: #fbfbfb;
`;

/* const Form = styled.form`
  display: flex;
  width: 40%;
  padding:20px;
  flex-wrap: wrap;
  background-color: #c52424;
`; */

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: -7% 20% 20% 13%;
  padding: 10px;
  /* ----- */
  width: 75%;
  background: #FDFCFB;
  color: #737373;
  letter-spacing: 1px;
  text-indent: 5%;
  border-radius: 5px 0 0 5px;
`;

const Butto = styled.button`
  height: 44px;
  margin: -5% 18% 0 20%;
  border:none;
  width: 25%;
  height: 46px;
  background: white;
  border: 2px solid #6d6e6d;
  font-family: inherit;
  font-weight: bold;
  color: inherit;
  letter-spacing: 1px;
  margin-top: 11%;
  cursor: pointer;
  width: 61%;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

/* const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`; */



const ComContenedor = styled.div``;

/* const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`; */

const Comentario = styled.li`
  margin-top:5%;
  border: 1px solid #e1e1e1;
  padding: 2rem;
  list-style:none;
`;


const Producto = () => {
  
    const styles= useStyles();
    const router = useRouter();
    const { query: { id }} = router;
    /* console.log(id) */

    
    const [resultado, setResultado] = useState([]);
    const [tipo, setTipo] = useState([]);

    const [comentario, setComentario] = useState({
      restaurant:'',
      email: '',
      comments: '',
      rating: ''
    })

    

    const onsubmi = async(ev:any) => {
      ev.preventDefault();

      const { restaurant, email, comments, rating } = comentario;

      const resp = await fetchSinToken('/reviews/',{ restaurant, email, comments, rating }, 'POST');
      console.log(resp);
    }
    
    /* const peticionPost = async() => {
      const resp = await fetchSinToken(`/reviews/{slug}/`);
    } */
    useEffect(() => {
        const consultarAPI = async () => {
            
    
            const resp = await fetchSinToken(`restaurants/${ id }/`,{});
            setResultado(resp);
            const tipo = await fetchSinToken(`food_types/${ resp.food_type }/`,{});
            setTipo(tipo);
        }
        consultarAPI();
    }, []);

    const { logo,name, description,rating, reviews, slug}:any =  resultado;
    

    const handleChange =({ target }:any)=>{
      /* e.preventDefault(); */
      const { restaurant } = comentario;
      const { name, value } = target;
      setComentario({
        ...comentario,
        restaurant:slug,
        [name]: value
      })
      /* console.log(comentario); */
    
    }
    /* console.log(reviews) */
    return (
        <Container>
            <Navbar/>
            <Wrapper>
                <ImgContainer>
                    <Image src={ logo}/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{ name }</Title>
                    <Desc>{ description}</Desc>
                    <Titulo>Clasificación</Titulo>
                    <Price>{ rating }</Price>
                    <Titulo>Tipo de comida</Titulo>
                    <Tipo>{tipo.name }</Tipo>
                    <ComContenedor>
                          <Form onSubmit = { onsubmi }>
                            <Agregar>Agregar Comentarios</Agregar>
                            <TextField 
                              name="email" 
                              label="email"
                              className={ styles.inputMaterial } 
                              value={ comentario.email } 
                              onChange={handleChange}
                            />
                            <TextField 
                              name="comments" 
                              label="comments"
                              className={ styles.inputMaterial } 
                              value={ comentario.comments } 
                              onChange={handleChange}
                            />
                            <TextField 
                              name="rating" 
                              label="rating"
                              className={ styles.inputMaterial } 
                              type="number"
                              value={ comentario.rating } 
                              onChange={handleChange}
                            />
                            {/* <Button>Agregar</Button> */}
                            <Butto /* onClick={() => peticionPost() } */>Agregar</Butto>
                          </Form>
                            {
                              reviews && reviews.map((review:any) => (
                                <div key={review.slug}>
                                  <Comentario>
                                    <p>{review.comments}</p>
                                    <p>Escrito por: 
                                      <span>{review.email}</span>
                                    </p>
                                    <p>Clasificasion: { review.rating }</p>
                                    <p>Creado: { review.created }</p>
                                  </Comentario>
                                </div>
                              ))
                            }

                    </ComContenedor>
                    
                </InfoContainer>
            </Wrapper>
        </Container>
        
    )
}

export default Producto;
