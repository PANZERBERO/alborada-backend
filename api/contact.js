// api/contact.js

import { google } from 'googleapis';

// 1. Configura la autenticación con tu cuenta de servicio
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });

export default async function handler(req, res) {
  // 2. Manejo básico de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // 3. Solo permitimos POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    // 4. Leemos los campos del body
    const {
      nombre,
      empresa,
      rut,
      correo,
      telefono,
      camion,
      fecha,
      mensaje
    } = req.body;

    // 5. Creamos la fila con timestamp + datos
    const now = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });
    const values = [[ now, nombre, empresa, rut, correo, telefono, camion, fecha, mensaje || '' ]];

    // 6. Insertamos en la hoja “Hoja 1”, columnas A a I
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Hoja 1!A1:I1',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    console.log('✅ Fila agregada en Sheets:', values);
    return res.status(200).json({ success: true, message: '¡Lead guardado en Sheets!' });

  } catch (err) {
    console.error('❌ Error al escribir en Sheets:', err);
    return res.status(500).json({ error: 'Error interno al acceder a Sheets' });
  }
}
