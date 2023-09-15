import React, { useContext, useState } from "react";
import { ProdutoSerivce } from "../../../services/ProdutoService.js";



function ProdutoFormulario() {
    const produtoNovo = {descricao:"", valor:0, valorPromocional:0};
    const[produto, setProduto] = useState(produtoNovo);
    const produtoService = new ProdutoSerivce();

    const alterarValor = (event) =>{
        setProduto({...produto,[event.target.name]:event.target.value});
    }

    const salvar = ()=>{
        produtoService.inserir(produto).then(data=>{

        });
    }


    return (
        <div style={{padding: '10px'}}>
            <h1>Inserir ou alterar Produtos</h1>
            <input type="text" name="descricao" value={produto.descricao} onChange={alterarValor}/>
            <input type="number" name="valor" value={produto.valor} onChange={alterarValor}/>
            <input type="number" name="valorPromocional" value={produto.valorPromocional} onChange={alterarValor}/>
            <button onClick={salvar}>Salvar</button>
            <p>Conteúdo....</p>
        </div>

    );



};

export default ProdutoFormulario;
