import React, { useEffect, useRef, useState } from "react";
import './EstadoLista.css';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { EstadoService } from "../../../../services/EstadoService";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Paginator } from 'primereact/paginator';
import { Toast } from 'primereact/toast';


const EstadoLista = () => {
    const navigate = useNavigate();
    const [estados, setEstados] = useState([]);
    const [idExcluir, setIdExcluir] = useState(null);
    const [dialogExcluir, setDialogExcluir] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const toast = useRef(null);
    

    const estadoService = new EstadoService();

    useEffect(() => {
        buscarEstados();
    }, [first, rows]);

    const showToast = (descricao, severity) => {
        if (toast.current) {
            toast.current.show({
                severity: severity,
                summary: 'Estado Excluído',
                detail: descricao,
                life: 5000,
            });
        }
    };

    const onPageChange = (event) =>{
		setFirst(event.first);
		setRows(event.rows);
	}

     const buscarEstados = () => {
        const page = first/rows;
		estadoService.listar(page, rows).then(data => {
			setEstados(data.data);
		})
    }
        

    const formulario = () => {
        navigate("/estadoForm");
    }

    const alterar = (rowData) => {
        navigate("/estadoForm", { state:{estadoAlterar: rowData } })
    }

    const excluir = () => {
                estadoService.excluir(idExcluir).then(data => {
                    showToast("Estado excluído com sucesso", "info");
                    buscarEstados();
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
            <h2>Lista de Estados</h2>
            <Button label="Adicionar Estado" onClick={formulario}/>
            <br /><br />
            <DataTable value={estados.content} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID"></Column>
                <Column field="nome" header="Nome"></Column>
                <Column field="sigla" header="Sigla" min></Column>
                <Column field="dataCriacao" header="Data de Criacao"></Column>
                <Column header="Opções" body={optionColumn}></Column>
            </DataTable>
            
            <Toast ref={toast} />
            <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[5, 10, 20, 30]} onPageChange={onPageChange} />

            <ConfirmDialog visible={dialogExcluir} onHide={() => setDialogExcluir(false)} message="Deseja excluir?"
                header="Confirmação" icon="pi pi-exclamation-triangle" accept={excluir} reject={() => setIdExcluir(null)} acceptLabel="Sim" rejectLabel="Não" />
        </div>
    );
}


export default EstadoLista;