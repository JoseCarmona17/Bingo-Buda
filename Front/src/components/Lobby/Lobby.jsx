import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Lobby.css';

export const Lobby = () => {
  const [userList, setUserList] = useState(['usuario1', 'usuario2', 'usuario3']);
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/home');
  };

  return (
    <div className='containerLobby'>
        <header>
          <a className='title'>EL BINGO GRAN BUDA</a>
  
          <nav className='navbar'>
            <a>Inicio</a>
            <a>Salir</a>
          </nav>
        </header>
  
        <div className='listUsers'>
          <h2 className='title2'>Sala de espera</h2>
  
          <h3>Lista de Usuarios</h3>
          <ul>
            {userList.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>

        <div className='containerButton'>
        <button className='buttonInit' onClick={handleStartGame}>
          Iniciar Juego
        </button>
      </div>
      </div>
    );
}