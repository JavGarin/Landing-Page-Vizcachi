import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(request, response) {
  if (request.method === 'POST') {
    const { nick, comment } = request.body;

    if (!nick) {
      return response.status(400).json({ error: 'Nick is required' });
    }

    const timestamp = new Date().toISOString();
    const newComment = { nick, comment: comment || '', timestamp };

    // Add comment to a list (for ordered retrieval)
    await redis.lpush('donations:comments', JSON.stringify(newComment));

    // Add nick to a set (for unique supporters)
    await redis.sadd('donations:supporters_unique', nick);

    return response.status(200).json({ message: 'Comment added successfully' });

  } else if (request.method === 'GET') {
    const { offset = 0, limit = 10 } = request.query; // Default to 0 offset, 10 comments

    // Fetch comments from the list
    const rawComments = await redis.lrange('donations:comments', parseInt(offset), parseInt(offset) + parseInt(limit) - 1);
    const comments = rawComments.map(c => JSON.parse(c));

    // Optionally, get total count for pagination info
    const totalComments = await redis.llen('donations:comments');

    return response.status(200).json({ comments, totalComments });

  } else {
    response.setHeader('Allow', ['GET', 'POST']);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
