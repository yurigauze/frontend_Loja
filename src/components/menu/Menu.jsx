import React, { useContext } from 'react';
import './Menu.css';
import { TemaContexto } from '../../App';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const  {temaDark, setTemaDark}  = useContext(TemaContexto);
  const navigate = useNavigate();

  const mudarTema = () => {
    setTemaDark(!temaDark); // Inverta o valor do temaDark
  }

  const chamarPagina = (pagina)=>{
    navigate(pagina);
  }

  return (
    <div className={`menu ${temaDark?'dark':'light'}`}>
      <ul>
        <li onClick={()=>chamarPagina('/')}>Home</li>
        <li onClick={()=>chamarPagina('/produto')}>Produtos</li>
        <li onClick={mudarTema}>Mudar Tema</li>
      </ul>
    </div>
  );
};

export default Menu;
