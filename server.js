const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para listar los contactos almacenados
app.get('/contactos', async (req, res) => {
  try {
    const response = await axios.get('http://www.raydelto.org/agenda.php');
    const contactos = response.data;
    res.send(contactos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los contactos');
  }
});

// Ruta para almacenar nuevos contactos
app.post('/contactos', async (req, res) => {
  try {
    const contacto = req.body;
    const response = await axios.post('http://www.raydelto.org/agenda.php', contacto);
    res.send('Contacto almacenado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al almacenar el contacto');
  }
});

const PORT = process.env.PORT || 2811;
app.listen(PORT, () => {
  console.log(`Servidor web iniciado en el puerto ${PORT}`);
});

