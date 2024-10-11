const express = require('express');
const Crypto = require('../models/crypto');
const router = express.Router();

router.get('/', async (req, res) => {
    const coin = req.query.coin;
    try {
        const data = await Crypto.find({ coin }).sort({ createdAt: -1 }).limit(100);
        if (data.length < 2) {
            return res.status(404).json({ message: 'Not enough data for deviation' });
        }
        
        const prices = data.map(record => record.price);
        const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
        const deviation = Math.sqrt(prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length);
        
        return res.json({ deviation: deviation.toFixed(2) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
