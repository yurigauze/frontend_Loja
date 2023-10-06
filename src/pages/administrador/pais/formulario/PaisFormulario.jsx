import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './PaisFormulario.css';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { PaisService } from "../../../../services/PaisService";



const PaisFormulario = (props) => {
    //const navigate = useNavigate();
    //const location = useLocation();
    ///const { id } = location.state || {};
    //const { ii } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { paisAlterar } = location.state || {};
    const paisNovo = { nome: '', sigla: '' };
    const [pais, setPais] = useState(paisNovo);
    const paisService = new PaisService();

    useEffect(() => {
        if (paisAlterar) {
            setPais(paisAlterar);
        } else {
            setPais(paisNovo);
        }
    }, [])

    const alterarValor = (event) => {
        setPais({ ...pais, [event.target.name]: event.target.value });
    }

    const salvar = () => {
        if (pais.id) {
            paisService.alterar(pais).then(data => {
                console.log(data);
              
            });
            navigate("/pais");
        } else {
            paisService.inserir(pais).then(data => {
                console.log(data);
            });
            navigate("/pais");
        }

    }

    return (
        <div style={{ padding: '10px' }}>
            <h2>Inserir ou Alterar um Pais</h2>
            <div className="nomePais">
                <p>Nome do Pais</p>
                <InputText type="text" placeholder="Nome" name="nome" value={pais.nome} onChange={alterarValor} /> <br></br>
            </div>

            <div className="ufPais">
                <p>UF do Pais</p>
                <InputText placeholder="Sigla" name="sigla" value={pais.sigla} onChange={alterarValor} /> <br></br>
            </div>
            <br></br>
            <Button label="Salvar" onClick={salvar} />
        </div>
    );
}

export default PaisFormulario;