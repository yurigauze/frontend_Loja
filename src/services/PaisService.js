import axios from "axios"


export class PaisService {
    URL = "http://localhost:8080/pais";

    inserir(pais) {
        return axios.post(this.URL, pais);

    }

    alterar(pais) {
        return axios.put(this.URL, pais);

    }

    excluir(id) {
        return axios.delete(this.URL + "/" + id);

    }

    listar(page, size) {
        return axios.get(this.URL+"?page="+page+"&size="+size);

    }
    list() {
        return axios.get(this.URL + "/list");

    }

}