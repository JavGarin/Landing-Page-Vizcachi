import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(request, response) {
  if (request.method === 'POST') {
    // Webhook para Buy Me a Coffee y PayPal
    // Se espera un cuerpo de JSON como: { "name": "Nuevo Donante" }
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    // Usamos un Set en Redis para evitar nombres duplicados
    await redis.sadd('supporters', name);

    return response.status(200).json({ message: 'Supporter added' });

  } else if (request.method === 'GET') {
    // Ruta para que la página obtenga la lista
    const supporters = await redis.smembers('supporters');
    return response.status(200).json({ supporters });

  } else {
    response.setHeader('Allow', ['GET', 'POST']);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
