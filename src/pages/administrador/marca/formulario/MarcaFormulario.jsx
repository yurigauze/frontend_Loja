import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './MarcaFormulario.css';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { MarcaService } from "../../../../services/MarcaService";



const MarcaFormulario = (props) => {
    //const navigate = useNavigate();
    //const location = useLocation();
    ///const { id } = location.state || {};
    //const { ii } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { marcaAlterar } = location.state || {};
    const marcaNovo = { nome: '', sigla: '' };
    const [marca, setMarca] = useState(marcaNovo);
    const marcaService = new MarcaService();

    useEffect(() => {
        if (marcaAlterar) {
            setMarca(marcaAlterar);
        } else {
            setMarca(marcaNovo);
        }
    }, [])

    const alterarValor = (event) => {
        setMarca({ ...marca, [event.target.name]: event.target.value });
    }

    const salvar = () => {
        if (marca.id) {
            marcaService.alterar(marca).then(data => {
                console.log(data);
              
            });
            navigate("/marcas");
        } else {
            marcaService.inserir(marca).then(data => {
                console.log(data);
            });
            navigate("/marcas");
        }

    }

    return (
        <div style={{ padding: '10px' }}>
            <h2>Inserir ou Alterar um Marca</h2>
            <div className="nomeMarca">
                <p>Nome do Marca</p>
                <InputText type="text" placeholder="Nome" name="nome" value={marca.nome} onChange={alterarValor} /> <br></br>
            </div>

            <div className="ufMarca">
                <p>UF do Marca</p>
                <InputText placeholder="Sigla" name="sigla" value={marca.sigla} onChange={alterarValor} /> <br></br>
            </div>
            <br></br>
            <Button label="Salvar" onClick={salvar} />
        </div>
    );
}

export default MarcaFormulario;