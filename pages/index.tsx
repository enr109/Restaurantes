import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Layout } from '../components/layout/Layout';
import { Restaurantes } from '../components/Restaurantes';
import { Annomouncement } from '../components/Annomouncement';
import { Productos } from '../components/Productos';

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
        {/* <h1>Inicio</h1> */}
        <Productos/>
        {/* <Restaurantes/> */}
      </Layout>


      
    </div>
  )
}


export default Home
