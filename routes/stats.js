const express = require('express');
const Crypto = require('../models/crypto');
const router = express.Router();

router.get('/', async (req, res) => {
    const coin = req.query.coin;
    try {
        const data = await Crypto.find({ coin }).sort({ createdAt: -1 }).limit(1);
        if (data.length > 0) {
            return res.json(data[0]);
        } else {
            return res.status(404).json({ message: 'Data not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
