import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    // Este es el webhook que llamará Buy Me a Coffee (o similar)
    // Se espera un cuerpo de JSON como: { "name": "Nuevo Donante" }
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    // Usamos un Set en Vercel KV para evitar nombres duplicados
    await kv.sadd('supporters', name);

    return response.status(200).json({ message: 'Supporter added' });

  } else if (request.method === 'GET') {
    // Esta es la ruta que llamará nuestra página para obtener la lista
    const supporters = await kv.smembers('supporters');
    return response.status(200).json({ supporters });

  } else {
    // Manejar otros métodos HTTP
    response.setHeader('Allow', ['GET', 'POST']);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
