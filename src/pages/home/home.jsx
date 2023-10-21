import React, { useContext } from "react";
import styles from './home.module.css';
import { TemaContexto } from "../../App";
import ProdutoNotificacao from "../../components/produto-notificacao/ProdutoNotificacaoComponent";


function Home() {
    const {dark, setDark} = useContext(TemaContexto);

    return (
        <div>
            <div className={styles.home}>
                <h1>Bem-vindo à Página Inicial da sua Loja Virtual</h1>
                <p>Conteúdo....</p>
                <ProdutoNotificacao />
            </div>
        </div>
            );


};

export default Home;
