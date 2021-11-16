import type { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../components/layout/Layout';
import { Productos } from '../components/Productos';
import { Filtro } from '../components/Filtro';


const Home: NextPage = () => {
  
  return (
    <div>
      {/* <Annomouncement/> */}
      <Head>
        <title>Restaurante</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {/* <Filtro/> */}
        {/* <h1>Inicio</h1> */}
        <Productos/>
        {/* <Restaurantes/> */}
      </Layout>


      
    </div>
  )
}


export default Home
