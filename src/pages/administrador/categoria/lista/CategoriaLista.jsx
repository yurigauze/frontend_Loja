import React, { useEffect, useState } from "react";
import './CategoriaLista.css';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { CategoriaService } from "../../../../services/CategoriaService";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Paginator } from "primereact/paginator";




const CategoriaLista = () => {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [idExcluir, setIdExcluir] = useState(null);
    const [dialogExcluir, setDialogExcluir] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    
    const categoriaService = new CategoriaService();

   useEffect(() => {
        buscarCategorias();
    }, [first, rows]);

    const buscarCategorias = () => {
        const page = first/rows;
       categoriaService.listar(page, rows).then(data => {
        setCategorias(data.data);
       })
    }

    const formulario = () => {
        navigate("/categoriaForm");
    }

    const onPageChange = (event) =>{
		setFirst(event.first);
		setRows(event.rows);
	}

    const alterar = (rowData) => {
        navigate("/categoriaForm", { state:{categoriaAlterar: rowData } })
    }

            const excluir = () => {
                categoriaService.excluir(idExcluir).then(data => {
                    buscarCategorias();
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
            <h2>Lista de Categorias</h2>
            <Button label="Adicionar Categoria" onClick={formulario}/>
            <br /><br />
            <DataTable value={categorias.content} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID"></Column>
                <Column field="nome" header="Nome"></Column>
                <Column field="dataCriacao" header="Data de Criacao"></Column>
                <Column field="dataAtualizacao" header="Data de Atualização"></Column>
                <Column header="Opções" body={optionColumn}></Column>
            </DataTable>

            <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[5, 10, 20, 30]} onPageChange={onPageChange} />
            <ConfirmDialog visible={dialogExcluir} onHide={() => setDialogExcluir(false)} message="Deseja excluir?"
                header="Confirmação" icon="pi pi-exclamation-triangle" accept={excluir} reject={() => setIdExcluir(null)} acceptLabel="Sim" rejectLabel="Não" />
            
        </div>
    );
}

export default CategoriaLista;