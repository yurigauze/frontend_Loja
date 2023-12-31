import React, { useEffect, useState } from "react";
import './MarcaLista.css';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { MarcaService } from "../../../../services/MarcaService";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Paginator } from "primereact/paginator";



const MarcaLista = () => {
    const navigate = useNavigate();
    const [marcas, setMarcas] = useState([]);
    const [idExcluir, setIdExcluir] = useState(null);
    const [dialogExcluir, setDialogExcluir] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    
    const marcaService = new MarcaService();

   useEffect(() => {
        buscarMarcas();
    }, [first, rows]);

    const buscarMarcas = () => {
       marcaService.listar().then(data => {
        setMarcas(data.data);
       })
    }

    const formulario = () => {
        navigate("/marcaForm");
    }

    const onPageChange = (event) =>{
		setFirst(event.first);
		setRows(event.rows);
	}

    const alterar = (rowData) => {
        navigate("/marcaForm", { state:{marcaAlterar: rowData } })
    }

            const excluir = () => {
                marcaService.excluir(idExcluir).then(data => {
                    buscarMarcas();
                });
            }

    const optionColumn = (rowData) => {
        return (
            <>
                <Button className="botao" label="Alterar" severity="warning" onClick={() => alterar(rowData)} />
                <Button className="botao" label="Excluir" severity="dander" onClick={() => { setIdExcluir(rowData.id); setDialogExcluir(true) }} />

            </>
        )
    }

    return (
        <div className="container">
            <h2>Lista de Marcas</h2>
            <Button label="Adicionar Marca" onClick={formulario}/>
            <br /><br />
            <DataTable value={marcas.content} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID"></Column>
                <Column field="nome" header="Nome"></Column>
                <Column field="dataCriacao" header="Data de Criacao"></Column>
                <Column header="Opções" body={optionColumn}></Column>
            </DataTable>

            <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[5, 10, 20, 30]} onPageChange={onPageChange} />
            <ConfirmDialog visible={dialogExcluir} onHide={() => setDialogExcluir(false)} message="Deseja excluir?"
                header="Confirmação" icon="pi pi-exclamation-triangle" accept={excluir} reject={() => setIdExcluir(null)} acceptLabel="Sim" rejectLabel="Não" />
            
        </div>
    );
}

export default MarcaLista;