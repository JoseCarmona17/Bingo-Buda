/* El código define un componente funcional de React llamado `Home`. */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const [timer, setTimer] = useState(30);
  const [userList, setUserList] = useState(['usuario1', 'usuario2', 'usuario3']);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      // Navegar a la ruta '/board' cuando el temporizador llega a 0
      navigate('/board');
    }
  }, [timer, navigate]);

  return (
    <div>
      <header>
        <a className='title'>EL BINGO GRAN BUDA</a>
        <p>Cronómetro: {timer} segundos</p>

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
    </div>
  );
};