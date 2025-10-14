// api/plans.js
export default function handler(req, res) {
  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      price: '9.99',
      features: ['5 comandos', 'Soporte por email', 'Actualizaciones mensuales']
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '24.99',
      features: ['Comandos ilimitados', 'Dashboard web', 'Soporte prioritario en Discord', 'Webhooks personalizados'],
      popular: true
    }
  ];
  
  res.status(200).json(plans);
}