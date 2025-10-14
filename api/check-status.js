// api/check-status.js
export default function handler(req, res) {
  // Aquí podrías hacer una llamada real a tu bot en el futuro
  const status = {
    bot: "online",
    latency: Math.floor(Math.random() * 80) + 20, // 20-100ms
    servers: 142,
    users: 3850,
    lastUpdate: new Date().toISOString()
  };
  
  res.status(200).json(status);
}