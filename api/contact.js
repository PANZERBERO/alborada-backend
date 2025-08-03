// contact.js - API para recibir datos de contacto y procesarlos

const express = require('express');
const router = express.Router();

// Aquí puedes agregar la lógica para guardar en Google Sheets y enviar email
router.post('/', async (req, res) => {
    // Recibe los datos del formulario
    const datos = req.body;
    // ... lógica para guardar en Sheets y enviar email ...
    res.json({ success: true, message: 'Contacto recibido correctamente.' });
});

module.exports = router;
