const express = require('express');
const connectDb = require('./configs/connectDb');
const userRoutes = require('./routes/user');
connectDb();

const app = express();
app.use(express.json());
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;