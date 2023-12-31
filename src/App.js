import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Rodape from './components/rodape/Rodape';
import Menu from './components/cabecalho/cabecalho';
import React, { useState, createContext } from 'react';
import Home from './pages/home/home';
import ProdutoFormulario from './pages/produto/formulario/ProdutoFormulario';
import Produtolista from './pages/produto/lista/ProdutoLista';
import EstadoFormulario from './pages/administrador/estado/formulario/EstadoFormulario';
import Administrador from './pages/administrador/Administrador';
import EstadoLista from './pages/administrador/estado/lista/EstadoLista';
import MarcaLista from './pages/administrador/marca/lista/MarcaLista';
import MarcaFormulario from './pages/administrador/marca/formulario/MarcaFormulario';
import CategoriaFormulario from './pages/administrador/categoria/formulario/CategoriaFormulario';
import CategoriaLista from './pages/administrador/categoria/lista/CategoriaLista';
import PaisLista from './pages/administrador/pais/lista/PaisLista';
import PaisFormulario from './pages/administrador/pais/formulario/PaisFormulario';
import CidadeFormulario from './pages/administrador/cidade/formulario/CidadeFormulario';
import CidadeLista from './pages/administrador/cidade/lista/CidadeLista';


export const TemaContexto = createContext();

function App() {

  const [dark, setDark] = useState(true);
  return (
    <div className="App">

      <TemaContexto.Provider value={{dark, setDark}}>
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route exact path='/' Component={() => <Home />} />
            <Route path='/produto-formulario' Component={ProdutoFormulario} />
            <Route path='/produtos' Component={Produtolista} />
            <Route path='/administrador' Component={Administrador}/>
            <Route path='/estadoForm' Component={EstadoFormulario}/>
            <Route path='/estados' Component={EstadoLista}/>
            <Route path='/marcas' Component={MarcaLista} />
            <Route path='/marcaForm' Component={MarcaFormulario} />
            <Route path='/categoria' Component={CategoriaLista}/>
            <Route path='/categoripaisForm' Component={CategoriaFormulario}/>
            <Route path='/paisForm' Component={PaisFormulario} />
            <Route path='/pais' Component={PaisLista} />
            <Route path='cidadeForm' Component={CidadeFormulario} />
            <Route path='/cidade' Component={CidadeLista} />
          </Routes>
        </BrowserRouter>
        <Rodape />
      </TemaContexto.Provider>

    </div>
  );
}

export default App;
