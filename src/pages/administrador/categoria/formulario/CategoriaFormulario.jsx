import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './CategoriaFormulario.css';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { CategoriaService } from "../../../../services/CategoriaService";



const CategoriaFormulario = (props) => {
    //const navigate = useNavigate();
    //const location = useLocation();
    ///const { id } = location.state || {};
    //const { ii } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { categoriaAlterar } = location.state || {};
    const categoriaNovo = { nome: ''};
    const [categoria, setCategoria] = useState(categoriaNovo);
    const categoriaService = new CategoriaService();

    useEffect(() => {
        if (categoriaAlterar) {
            setCategoria(categoriaAlterar);
        } else {
            setCategoria(categoriaNovo);
        }
    }, [])

    const alterarValor = (event) => {
        setCategoria({ ...categoria, [event.target.name]: event.target.value });
    }

    const salvar = () => {
        if (categoria.id) {
            categoriaService.alterar(categoria).then(data => {
                console.log(data);
              
            });
            navigate("/categoria");
        } else {
            categoriaService.inserir(categoria).then(data => {
                console.log(data);
            });
            navigate("/categoria");
        }

    }

    return (
        <div style={{ padding: '10px' }}>
            <h2>Inserir ou Alterar uma Categoria</h2>
            <div className="nomeCategoria">
                <p>Nome da Categoria</p>
                <InputText type="text" placeholder="Nome" name="nome" value={categoria.nome} onChange={alterarValor} /> <br></br>
            </div>

            <br></br>
            <Button label="Salvar" onClick={salvar} />
        </div>
    );
}

export default CategoriaFormulario;