const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Importar el router de contacto
const contactRouter = require('./api/contact');

// Configuraciones
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint para contacto
app.use('/api/contact', contactRouter);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('🚀 Servidor de Alborada Rental funcionando!');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🎯 Servidor corriendo en http://localhost:${PORT}`);
});