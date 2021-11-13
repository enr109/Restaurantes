import React, { Fragment } from "react";
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { Header } from "./Header";

export const Layout = (props:any) => {
    return (
        <Fragment>
            <Header/>

            {/* <nav>
                <Link href="/">Inicio</Link>
                <Link href="/nosotros">Nosotros</Link>

            </nav> */}
            <main className={styles.main}>
                {props.children}

            </main>
        </Fragment>
    )
}
