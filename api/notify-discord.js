// api/notify-discord.js
export default async function handler(req, res) {
  // Solo permitimos POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, email, plan } = req.body;

  // Validación básica
  if (!name || !email || !plan) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  // ✅ Aquí va tu webhook (oculta del frontend)
  const WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1427343604761890857/NYjieeAWywb48bd_WtPFBxEEeVr5akDLVl69duW9LQ0_okGCsFTnGxI8cKmnh6mMFb4a';

  // Mensaje bonito para Discord
  const embed = {
    title: '🔔 ¡Nueva solicitud de compra!',
    color: 0x00f0ff,
    fields: [
      { name: 'Nombre', value: name, inline: true },
      { name: 'Email', value: email, inline: true },
      { name: 'Plan', value: plan, inline: false },
    ],
    timestamp: new Date().toISOString(),
    footer: { text: 'DarKlinca Future - Bot de Discord' }
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] })
    });

    if (response.ok) {
      res.status(200).json({ success: true, message: 'Notificación enviada' });
    } else {
      console.error('Error en webhook:', await response.text());
      res.status(500).json({ error: 'No se pudo enviar a Discord' });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error interno' });
  }
}