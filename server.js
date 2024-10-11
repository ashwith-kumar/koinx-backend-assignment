const express = require('express');
const mongoose = require('mongoose');
const fetchCryptoData = require('./cron/fetchdata');
const statsRouter = require('./routes/stats');
const deviationRouter = require('./routes/deviation');



const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const cron = require('node-cron');

// Fetching for every 2 seconds
cron.schedule('*/2 * * * * *', fetchCryptoData);
// if we want to fetch data every 2 hours  */2 * * *
app.use('/stats', statsRouter);
app.use('/deviation', deviationRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
