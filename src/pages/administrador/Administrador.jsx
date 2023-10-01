import React, { useContext } from "react";
import styles from './administrador.module.css';
import { useNavigate } from 'react-router-dom';


const Administrador = () => {

    const navigate = useNavigate();

    const navegar = (pagina) => {
        navigate(pagina);
    }

    return (
        <div className={styles.home}>
            <h1>Administrador</h1>
            <p>Conteúdo....</p>
            <div className="lista">
                <ul>
                    <li onClick={() => navegar('/estados')}>Estados</li>
                    <li onClick={() => navegar('/marcas')}>Marcas</li>
                    <li onClick={() => navegar('/categoria')}>Categoria</li>

                </ul>
            </div>
        </div>

    );



};

export default Administrador;
