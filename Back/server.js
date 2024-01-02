const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/usuarios', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
  console.log('Recibida solicitud de inicio de sesión');

  try {
    const { username, password } = req.body;

    console.log('Contenido de req.body en /login:', req.body);

    if (!username || !password) {
      console.log('Nombre de usuario o contraseña faltante');
      return res.status(400).json({ error: 'Nombre de usuario o contraseña faltante' });
    }

    console.log('Intento de inicio de sesión para el usuario:', username);

    const user = await User.findOne({ username });

    console.log('Usuario encontrado en la base de datos:', user);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      console.log('Resultado de la comparación de contraseñas:', passwordMatch);

      if (passwordMatch) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      } else {
        console.log('Credenciales incorrectas');
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    } else {
      console.log('Usuario no encontrado en la base de datos');
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al buscar el usuario en la base de datos:', error.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.post('/register', async (req, res) => {
  console.log('Recibida solicitud de registro');

  try {
    const { username, password } = req.body;

    console.log('Contenido de req.body en /register:', req.body);

    if (!username || !password) {
      console.log('Nombre de usuario o contraseña faltante');
      return res.status(400).json({ error: 'Nombre de usuario o contraseña faltante' });
    }

    console.log('Intento de registro para el usuario:', username);

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      console.log('El usuario ya existe');
      res.status(400).json({ error: 'El usuario ya existe' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.json({ message: 'Usuario registrado exitosamente' });
    }
  } catch (error) {
    console.error('Error al registrar el usuario en la base de datos:', error.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
