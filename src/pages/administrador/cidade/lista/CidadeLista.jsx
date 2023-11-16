import React, { useEffect, useRef, useState } from "react";
import './CidadeLista.css';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { CidadeService } from "../../../../services/CidadeService";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Paginator } from 'primereact/paginator';
import { Toast } from 'primereact/toast';


const CidadeLista = () => {
    const navigate = useNavigate();
    const [cidades, setCidades] = useState([]);
    const [idExcluir, setIdExcluir] = useState(null);
    const [dialogExcluir, setDialogExcluir] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const toast = useRef(null);
    

    const cidadeService = new CidadeService();

    useEffect(() => {
        buscarCidades();
    }, [first, rows]);

    const showToast = (descricao, severity) => {
        if (toast.current) {
            toast.current.show({
                severity: severity,
                summary: 'Cidade Excluída',
                detail: descricao,
                life: 5000,
            });
        }
    };

    const onPageChange = (event) =>{
		setFirst(event.first);
		setRows(event.rows);
	}

     const buscarCidades = () => {
        const page = first/rows;
		cidadeService.listar(page, rows).then(data => {
			setCidades(data.data);
		})
    }
        

    const formulario = () => {
        navigate("/cidadeForm");
    }

    const alterar = (rowData) => {
        navigate("/cidadeForm", { state:{cidadeAlterar: rowData } })
    }

    const excluir = () => {
                cidadeService.excluir(idExcluir).then(data => {
                    showToast("Cidade excluído com sucesso", "info");
                    buscarCidades();
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
            <h2>Lista de Cidades</h2>
            <Button label="Adicionar Cidade" onClick={formulario}/>
            <br /><br />
            <DataTable value={cidades.content} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID"></Column>
                <Column field="nome" header="Nome"></Column>
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


export default CidadeLista;