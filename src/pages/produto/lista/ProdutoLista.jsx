import React, { useEffect, useState } from "react";
import './ProdutoLista.css';
import { useNavigate } from "react-router-dom";
import { ProdutoService } from "../../../services/ProdutoService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";


const ProdutoLista = () => {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const produtoService = new ProdutoService();

    useEffect(() => {
        buscarProdutos();
    }, []);

    const buscarProdutos = () => {
        produtoService.listar().then(data => {
            setProdutos(data.data);
        })
    }

    const formulario = () => {
        navigate("/produto-formulario");
    }

    const alterar = (rowData)=>{
        navigate("/produto-formulario", {state:{produtoAlterar:rowData}})
    }

    const excluir = () =>{

    }

    const optionColumn = (rowData) => {
        return (
            <>
                <Button label="Alterar" severity="warning" onClick={() => alterar(rowData)} />
                
            </>
        )
    }

    return (
        <div className="container">
            <h2>Lista de Produtos</h2>
            <button onClick={formulario}>Novo Produto</button>
            <br /><br />
            <DataTable value={produtos} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID"></Column>
                <Column field="descricao" header="Descricao"></Column>
                <Column field="valor" header="Valor "></Column>
                <Column field="valorPromocional" header="Valor Promocional"></Column>
                <Column header="Opções" body={optionColumn}></Column>
            </DataTable>

        </div>
    );
}

export default ProdutoLista;