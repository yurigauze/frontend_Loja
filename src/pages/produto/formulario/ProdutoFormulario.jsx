import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './ProdutoFormulario.css';
import { ProdutoService } from "../../../services/ProdutoService";

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';



const ProdutoFormulario = (props) => {
    //const navigate = useNavigate();
    //const location = useLocation();
    ///const { id } = location.state || {};
    //const { ii } = useParams();
    const location = useLocation();
    const { produtoAlterar } = location.state || {};
    const produtoNovo = { descricao: '', valor: 0, valorPromocional: 0 };
    const [produto, setProduto] = useState(produtoNovo);
    const produtoService = new ProdutoService();

    useEffect(() => {
        if (produtoAlterar) {
            setProduto(produtoAlterar);
        } else {
            setProduto(produtoNovo);
        }
    }, [])

    const alterarValor = (event) => {
        setProduto({ ...produto, [event.target.name]: event.target.value });
    }

    const salvar = () => {
        if (produto.id) {
            produtoService.alterar(produto).then(data => {
                console.log(data);
            });
        } else {
            produtoService.inserir(produto).then(data => {
                console.log(data);
            });
        }

    }

    return (
        <div style={{ padding: '10px' }}>
            <h2>Inserir ou Alterar um Produto</h2>
            <div className="nomeProduto">
                <p>Descrição do Produto</p>
                <InputText type="text" name="descricao" placeholder="Descrição"  value={produto.descricao} onChange={alterarValor} /> <br></br>
            </div>

            <div className="valorProduto">
                <p>Valor do Produto</p>
                <InputNumber value={produto.valor} name="valor" onValueChange={alterarValor} minFractionDigits={2} maxFractionDigits={2} /> <br></br>
            </div>

            <div className="valorPromocional">
                <p>Valor Promocional</p>
                <InputNumber value={produto.valorPromocional} name="valorPromocional" onValueChange={alterarValor} minFractionDigits={2} maxFractionDigits={2} /> <br></br>
            </div>
            <br></br>
            <Button label="Salvar" onClick={salvar} />
        </div>
    );
}

export default ProdutoFormulario;