import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './CidadeFormulario.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { CidadeService  } from "../../../../services/CidadeService";
import { EstadoService  } from "../../../../services/EstadoService";



const CidadeFormulario = () => {
    //const navigate = useNavigate();
    //const location = useLocation();
    ///const { id } = location.state || {};
    //const { ii } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { cidadeAlterar } = location.state || {};
    const [estados, setEstados] = useState([]);
    const cidadeNovo = { nome: '', estado_id: 0};
    const [cidade, setCidade] = useState(cidadeNovo);
    const cidadeService = new CidadeService();
    const [selectedEstado, setSelectedEstado] = useState(null);
    const estadoService = new EstadoService();

    useEffect(() => {
        buscarEstadoss();
        if (cidadeAlterar) {
            setCidade(cidadeAlterar);
        } else {
            setCidade(cidadeNovo);
        }
    }, [])

    const buscarEstadoss = () => {
        estadoService.listar().then(data => {
            console.log(data.data);
            if (data.data && data.data.content) {
                setEstados(data.data.content);
            } else {
                console.error("Formato de resposta inesperado:", data.data);
            }
        });
    };
    
    const alterarValor = (event) => {
        setCidade({ ...cidade, [event.target.name]: event.target.value });
    }

    const salvar = () => {
        if (cidade.id) {
            cidadeService.alterar(cidade).then(data => {
                console.log(data);
              
            });
            navigate("/cidade");
        } else {
            cidadeService.inserir(cidade).then(data => {
                console.log(data);
            });
            navigate("/cidade");
        }

    }

    const handleDropdownChange = (e) => {
        const estadoIdSelecionado = e.value.id;
        console.log(estadoIdSelecionado);
        setCidade({ ...cidade, estado_id: estadoIdSelecionado });
        setSelectedEstado(e.value); 
    };

    return (
        <div style={{ padding: '10px' }}>
            <h2>Inserir ou Alterar um Cidade</h2>
            <div className="nomeCidade">
                <p>Nome do Cidade</p>
                <InputText type="text" placeholder="Nome" name="nome" value={cidade.nome} onChange={alterarValor} /> <br></br>
            </div>

            <br></br>
            <Dropdown
                value={selectedEstado}
                onChange={handleDropdownChange} // Chame o manipulador de eventos personalizado
                options={estados}
                optionLabel="nome"
                placeholder="Selecione um Estado"
                className="w-full md:w-14rem"
            />
            <br></br>
            <br></br>
            <Button label="Salvar" onClick={salvar} />
        </div>
    );
}

export default CidadeFormulario;