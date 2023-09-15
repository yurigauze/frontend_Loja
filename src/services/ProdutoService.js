import axios from "axios"

    URL = "http://localhost:8080/produtos";
export class ProdutoSerivce{
   

    inserir(produto){
        return axios.post(URL, produto);

    }

    alterar(produto) {
        return axios.put(URL, produto);

    }

    excluir(id) {
        return axios.delete(URL, id);

    }

    listar() {
        return axios.get(URL);

    }

}