import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProdutoService } from "../../../services/ProdutoService";



function Produtolista() {

    const navigate = useNavigate();
    const[produtos, setProdutos] = useState([]);

    const produtoSerive = new produtoService();

        useEffect(()=>{
            buscarProdutos();

        }, []);

    const buscarProdutos = ()=>{
        produtoService.lisat().then(data=>{
            setProdutos(data.data);
        })
    }

    const formulario = () =>{
        navigate("/produto-formulario");
    }


    return (
        <div style={{ padding: '10px' }}>
            <h1>Lista</h1>
            <button onClick={formulario}>Novo Produto</button>
            <br></br>
            {produtos.map(produto=>
                <p key={produto.id}>{produto.descricao}{produto.valor}</p>
            )}
            <p>Conteúdo....</p>
        </div>

    );



};

export default Produtolista;
