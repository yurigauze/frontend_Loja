import React, { useEffect, useState } from "react";
import './EstadoLista.css';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { EstadoService } from "../../../../services/EstadoService";
import { format } from 'date-fns';


const EstadoLista = () => {
    const navigate = useNavigate();
    const [estados, setEstados] = useState([]);
    const estadoService = new EstadoService();

    useEffect(() => {
        buscarEstados();
    }, []);

    const buscarEstados = () => {
        estadoService.listar().then(data => {
            // Formatando a data aqui
            const estadosFormatados = data.data.map(estado => ({
                ...estado,
                dataCriacao: new Date(estado.dataCriacao).toLocaleDateString()
            }));
            setEstados(estadosFormatados);
        });
    }

    const formulario = () => {
        navigate("/estadoForm");
    }

    const alterar = (rowData) => {
        navigate("/estadoForm", { state:{estadoAlterar: rowData } })
    }

    const excluir = () => {


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
            <h2>Lista de Estados</h2>
            <button onClick={formulario}>Novo Produto</button>
            <br /><br />
            <DataTable value={estados} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID"></Column>
                <Column field="nome" header="Nome"></Column>
                <Column field="sigla" header="Sigla" min></Column>
                <Column field="dataCriacao" header="Data de Criacao"></Column>
                <Column header="Opções" body={optionColumn}></Column>
            </DataTable>

        </div>
    );
}

export default EstadoLista;