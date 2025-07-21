
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// La base de datos debe estar en una ruta escribible en Vercel, como /tmp
const dbPath = path.resolve(process.env.VERCEL ? '/tmp' : '.', 'donations.db');

module.exports = (req, res) => {
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

        db.get("SELECT SUM(amount) as total FROM donations", [], (err, row) => {
            if (err) {
                db.close();
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ total: row.total || 0 });
            db.close();
        });
    });
};
