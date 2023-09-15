import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";



function Produtolista() {

    const navigate = useNavigate();

    const formulario = () =>{
        navigate("/produto-formulario");
    }


    return (
        <div style={{ padding: '10px' }}>
            <h1>Lista</h1>
            <button onClick={formulario}>Novo Produto</button>
            <p>Conteúdo....</p>
        </div>

    );



};

export default Produtolista;
