// api/contact.js

export default async function handler(req, res) {
  // --- CORS (si tu frontend está en otro dominio) ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo aceptamos POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    console.log('✔️ Handler básico recibió:', req.body);
    // Aquí iría la lógica de Sheets / correo, pero de momento devolvemos OK:
    return res.status(200).json({ success: true, message: '¡Funciona el handler!' });
  } catch (err) {
    console.error('💥 Error en handler básico:', err);
    return res.status(500).json({ error: 'Error interno de prueba' });
  }
}
