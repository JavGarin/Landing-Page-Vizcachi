const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { amount } = req.body;
  const donationAmount = amount || req.body.data?.amount_usd; // Adaptar según el payload

  if (!donationAmount || typeof donationAmount !== 'number' || donationAmount <= 0) {
    return res.status(400).json({ error: 'Invalid or missing donation amount' });
  }

  try {
    const timestamp = new Date().toISOString();
    const donationId = `donation:${Date.now()}`;
    await redis.hset(donationId, {
      amount: donationAmount,
      timestamp: timestamp,
    });
    await redis.lpush('donations_list', donationId); // Store donation IDs in a list

    res.status(201).json({ success: true, id: donationId, amount: donationAmount });
  } catch (error) {
    console.error("Error adding donation to Redis:", error);
    res.status(500).json({ error: 'Failed to add donation' });
  }
};