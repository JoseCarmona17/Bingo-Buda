// Importar módulos y componentes necesarios
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import './LoginFrom.css';

// Definir y exportar el componente funcional LoginFrom
export const LoginFrom = () => {
  // Inicializar el hook useNavigate para la navegación programática
  const navigate = useNavigate();

  // Utilizar el hook useState para manejar el estado del nombre de usuario, contraseña y errores
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Manejar el evento de inicio de sesión al enviar el formulario
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        // Redirigir al componente Lobby después de una autenticación exitosa
        navigate('/lobby');
      } else {
        const { error } = await response.json();
        setError(error);
        localStorage.removeItem('token'); // Limpiar token en caso de error
      }
    } catch (error) {
      console.error('Error de red:', error.message);
      setError('Error de red al intentar iniciar sesión');
      localStorage.removeItem('token'); // Limpiar token en caso de error
    }
  };

  // Renderizar el formulario de inicio de sesión
  return (
    <div className='wrapper'>
      <form onSubmit={handleLogin}>
        <h1 className='name'>Bingo Gran Buda</h1>
        <h1>Iniciar Sesión</h1>
        <div className='input-box'>
          {/* Input para el nombre de usuario con icono de usuario */}
          <input
            type='text'
            placeholder='Usuario'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          {/* Input para la contraseña con icono de candado */}
          <input
            type='password'
            placeholder='Contraseña'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className='icon' />
        </div>

        {/* Mostrar mensaje de error si hay un error */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className='textBot'>
          {/* Botón para enviar el formulario de inicio de sesión */}
          <button type='submit'>Ingresar</button>

          <div className='register-link'>
            {/* Enlace para registrarse */}
            <p>
              ¿No tienes una cuenta? <Link to='/register'>Registrarse</Link>
            </p>
            {/* Enlace para configurar la cuenta */}
            <p>
              <Link to='/setup'>Configurar Cuenta</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
