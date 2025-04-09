const express = require('express');
const cors = require('cors'); 
const connectDb = require('./configs/connectDb');
const userRoutes = require('./routes/user');
const virulenceRoutes = require('./routes/virulence')
const AmrRoutes = require('./routes/amr')
const PlasmidRoutes = require('./routes/plasmid')
const SampleRoutes = require('./routes/sample')
const ExperimentRoutes = require('./routes/experiment')
connectDb();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use('/api/user', userRoutes);
app.use('/api/virulence', virulenceRoutes)
app.use('/api/amr', AmrRoutes)
app.use('/api/plasmid', PlasmidRoutes)
app.use('/api/sample', SampleRoutes)
app.use('/api/experiment', ExperimentRoutes)
app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;