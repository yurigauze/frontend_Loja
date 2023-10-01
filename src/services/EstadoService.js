import axios from "axios"


export class EstadoService {
    URL = "http://localhost:8080/estado";

    inserir(estado) {
        return axios.post(this.URL, estado);

    }

    alterar(estado) {
        return axios.put(this.URL, estado);

    }

    excluir(id) {
        return axios.delete(this.URL + "/" + id);

    }

    listar(page, size) {
        return axios.get(this.URL+"?page="+page+"&size="+size);

    }

}