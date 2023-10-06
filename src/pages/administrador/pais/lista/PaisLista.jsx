import React, { useEffect, useState } from "react";
import './PaisLista.css';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { PaisService } from "../../../../services/PaisService";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Paginator } from 'primereact/paginator';


const PaisLista = () => {
    const navigate = useNavigate();
    const [paiss, setPaiss] = useState([]);
    const [idExcluir, setIdExcluir] = useState(null);
    const [dialogExcluir, setDialogExcluir] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    

    const paisService = new PaisService();

    useEffect(() => {
        buscarPaiss();
    }, [first, rows]);

    const onPageChange = (event) =>{
		setFirst(event.first);
		setRows(event.rows);
	}

     const buscarPaiss = () => {
        const page = first/rows;
		paisService.listar(page, rows).then(data => {
			setPaiss(data.data);
		})
    }
        

    const formulario = () => {
        navigate("/paisForm");
    }

    const alterar = (rowData) => {
        navigate("/paisForm", { state:{paisAlterar: rowData } })
    }

    const excluir = () => {
                paisService.excluir(idExcluir).then(data => {
                    buscarPaiss();
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
            <h2>Lista de Paiss</h2>
            <Button label="Adicionar Pais" onClick={formulario}/>
            <br /><br />
            <DataTable value={paiss.content} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID"></Column>
                <Column field="nome" header="Nome"></Column>
                <Column field="sigla" header="Sigla" min></Column>
                <Column field="dataCriacao" header="Data de Criacao"></Column>
                <Column header="Opções" body={optionColumn}></Column>
            </DataTable>

            <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[5, 10, 20, 30]} onPageChange={onPageChange} />

            <ConfirmDialog visible={dialogExcluir} onHide={() => setDialogExcluir(false)} message="Deseja excluir?"
                header="Confirmação" icon="pi pi-exclamation-triangle" accept={excluir} reject={() => setIdExcluir(null)} acceptLabel="Sim" rejectLabel="Não" />
        </div>
    );
}


export default PaisLista;