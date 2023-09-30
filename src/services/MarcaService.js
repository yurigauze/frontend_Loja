import axios from "axios"


export class MarcaService {
    URL = "http://localhost:8080/marca";

    inserir(produto) {
        return axios.post(this.URL, produto);

    }

    alterar(produto) {
        return axios.put(this.URL, produto);

    }

    excluir(id) {
        return axios.delete(this.URL + "/" + id);

    }

    listar() {
        console.log(this.URL);
        return axios.get(this.URL);

    }

}