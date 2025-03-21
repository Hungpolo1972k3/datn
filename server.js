const express = require("express");
const virulenceRoutes = require("./routes/virulence");
const amrRoutes = require('./routes/amr')
const plasmidRoutes = require('./routes/plasmid')
require('dotenv').config();

const app = express();
const port = process.env.SERVER_LINUX_PORT || 5000;
app.use(express.json());
app.use("/api/virulence", virulenceRoutes);
app.use("/api/amrfinder", amrRoutes);
app.use("/api/plasmid", plasmidRoutes);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
