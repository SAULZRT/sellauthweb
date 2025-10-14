// api/submit-testimonial.js
const testimonials = []; // ⚠️ Solo para pruebas locales. En producción, usa una DB.

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo POST' });
  }

  const { name, message, server } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Nombre y mensaje obligatorios' });
  }

  // Guardar en memoria (solo dura mientras la función esté caliente)
  testimonials.push({
    id: Date.now(),
    name: name.trim(),
    server: server?.trim() || 'Servidor privado',
    message: message.trim(),
    date: new Date().toISOString()
  });

  // Enviar a tu Discord (opcional)
  console.log('Nuevo testimonio:', { name, message, server });

  res.status(200).json({ success: true, message: '¡Gracias por tu testimonio!' });
}