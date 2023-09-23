import React, { useContext } from "react";
import styles from './administrador.module.css';
import { TemaContexto } from "../../App";
import { useNavigate } from 'react-router-dom';


function Administrador() {
    const {dark, setDark} = useContext(TemaContexto);

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

                </ul>
            </div>
        </div>

    );



};

export default Administrador;
