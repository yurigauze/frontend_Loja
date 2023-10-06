import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './EstadoFormulario.css';
import { PaisService } from "../../../../services/PaisService";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { EstadoService } from "../../../../services/EstadoService";
import { Dropdown } from 'primereact/dropdown';



const EstadoFormulario = (props) => {
    //const navigate = useNavigate();
    //const location = useLocation();
    ///const { id } = location.state || {};
    //const { ii } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { estadoAlterar } = location.state || {};
    const [pais, setPais] = useState([]);
    const estadoNovo = { nome: '', sigla: '', pais_id: 0};
    const [estado, setEstado] = useState(estadoNovo);
    const estadoService = new EstadoService();
    const [selectedPais, setSelectedPais] = useState(null);
    const paisService = new PaisService();

    useEffect(() => {
        buscarPaiss();
        if (estadoAlterar) {
            setEstado(estadoAlterar);
        } else {
            setEstado(estadoNovo);
        }
    }, [])

    const buscarPaiss = () => {
        paisService.list().then(data => {
            console.log(data.data);
            setPais(data.data);
        })
    }
    const alterarValor = (event) => {
        setEstado({ ...estado, [event.target.name]: event.target.value });
    }

    const salvar = () => {
        if (estado.id) {
            estadoService.alterar(estado).then(data => {
                console.log(data);
              
            });
            navigate("/estados");
        } else {
            estadoService.inserir(estado).then(data => {
                console.log(data);
            });
            navigate("/estados");
        }

    }

    const handleDropdownChange = (e) => {
        const paisIdSelecionado = e.value.id;
        console.log(paisIdSelecionado);
        setEstado({ ...estado, pais_id: paisIdSelecionado });
        setSelectedPais(e.value); 
    };

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
            <Dropdown
                value={selectedPais}
                onChange={handleDropdownChange} // Chame o manipulador de eventos personalizado
                options={pais}
                optionLabel="nome"
                placeholder="Selecione um Pais"
                className="w-full md:w-14rem"
            />
            <br></br>
            <br></br>
            <Button label="Salvar" onClick={salvar} />
        </div>
    );
}

export default EstadoFormulario;