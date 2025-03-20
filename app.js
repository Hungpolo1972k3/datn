const express = require('express');
const connectDb = require('./configs/connectDb');
const userRoutes = require('./routes/user');
const virulenceRoutes = require('./routes/virulence')
const AmrRoutes = require('./routes/amr')
const PlasmidRoutes = require('./routes/plasmid')
connectDb();

const app = express();
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/virulence', virulenceRoutes)
app.use('/api/amr', AmrRoutes)
app.use('/api/plasmid', PlasmidRoutes)
app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;