const http = require('http');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
