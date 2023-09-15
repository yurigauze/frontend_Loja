import React, { useContext } from "react";
import styles from './home.module.css';
import { TemaContexto } from "../../App";


function Home() {
    const {dark, setDark} = useContext(TemaContexto);

    return (
        <div className={styles.home}>
            <h1>Bem-vindo à Página Inicial da sua Loja Virtual</h1>
            <p>Conteúdo....</p>
        </div>

    );



};

export default Home;
