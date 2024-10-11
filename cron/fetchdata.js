const axios = require('axios');
const Crypto = require('../models/crypto');
const mongoose = require('mongoose');

const fetchCryptoData = async () => {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    try {
        for (const coin of coins) {
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`);
            const data = response.data[coin];
            console.log(data);
            const cryptoData = new Crypto({
                coin: coin,
                price: data.usd,
                marketCap: data.usd_market_cap,
                change24h: data.usd_24h_change
            });
            await cryptoData.save();
        }
    } catch (error) {
        console.error("Error fetching crypto data:", error);
    }
};

module.exports = fetchCryptoData;
