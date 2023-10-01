import axios from "axios"

    
export class CategoriaService{
    URL = "http://localhost:8080/categorias";

    inserir(categoria){
        return axios.post(this.URL, categoria);

    }

    alterar(categoria) {
        return axios.put(this.URL, categoria);

    }

    excluir(id) {
        return axios.delete(this.URL + "/" + id);

    }

    listar(page, size) {
        return axios.get(this.URL+"?page="+page+"&size="+size);

    }

}