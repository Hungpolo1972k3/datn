const mongoose = require('mongoose');
require('dotenv').config();
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_CONNECT_URI);
        console.log("Connect MongoDB successfully !")
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
module.exports = connectDb;

