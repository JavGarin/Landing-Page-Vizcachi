const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

module.exports = async (req, res) => {
  try {
    const donationIds = await redis.lrange('donations_list', 0, -1);
    let total = 0;

    for (const id of donationIds) {
      const donation = await redis.hgetall(id);
      if (donation && donation.amount) {
        total += parseFloat(donation.amount);
      }
    }

    res.status(200).json({ total: total });
  } catch (error) {
    console.error("Error getting total from Redis:", error);
    res.status(500).json({ error: 'Failed to retrieve total' });
  }
};