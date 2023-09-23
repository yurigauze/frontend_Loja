import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import './EstadoFormulario.css';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { EstadoService } from "../../../../services/EstadoService";



const EstadoFormulario = (props) => {
    //const navigate = useNavigate();
    //const location = useLocation();
    ///const { id } = location.state || {};
    //const { ii } = useParams();
    const location = useLocation();
    const { estadoAlterar } = location.state || {};
    const estadoNovo = { nome: '', sigla: '' };
    const [estado, setEstado] = useState(estadoNovo);
    const estadoService = new EstadoService();

    useEffect(() => {
        if (estadoAlterar) {
            setEstado(estadoAlterar);
        } else {
            setEstado(estadoNovo);
        }
    }, [])

    const alterarValor = (event) => {
        setEstado({ ...estado, [event.target.name]: event.target.value });
    }

    const salvar = () => {
        if (estado.id) {
            estadoService.alterar(estado).then(data => {
                console.log(data);
            });
        } else {
            estadoService.inserir(estado).then(data => {
                console.log(data);
            });
        }

    }

    return (
        <div style={{ padding: '10px' }}>
            <h2>Inserir ou Alterar um Estado</h2>
            <div className="nomeEstado">
                <p>Nome do Estado</p>
                <InputText type="text" placeholder="Nome" name="nome" value={estado.nome} onChange={alterarValor} /> <br></br>
            </div>

            <div className="ufEstado">
                <p>UF do Estado</p>
                <InputText placeholder="Sigla" name="sigla" value={estado.sigla} onChange={alterarValor} /> <br></br>
            </div>
            <br></br>
            <Button label="Salvar" onClick={salvar} />
        </div>
    );
}

export default EstadoFormulario;