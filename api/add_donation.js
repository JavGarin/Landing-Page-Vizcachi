
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(process.env.VERCEL ? '/tmp' : '.', 'donations.db');

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error("Error opening database:", err.message);
            return res.status(500).json({ error: err.message });
        }
    });

    db.run('CREATE TABLE IF NOT EXISTS donations (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL NOT NULL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)', (err) => {
        if (err) {
            db.close();
            return res.status(500).json({ error: err.message });
        }

        // Esta función ahora puede manejar tanto webhooks como otras llamadas POST
        const { amount } = req.body;
        const donationAmount = amount || req.body.data?.amount_usd; // Adaptar según el payload

        if (!donationAmount || typeof donationAmount !== 'number' || donationAmount <= 0) {
            db.close();
            return res.status(400).json({ error: 'Invalid or missing donation amount' });
        }

        db.run(`INSERT INTO donations (amount) VALUES (?)`, [donationAmount], function(err) {
            if (err) {
                db.close();
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ success: true, id: this.lastID, amount: donationAmount });
            db.close();
        });
    });
};
