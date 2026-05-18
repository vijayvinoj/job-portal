const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // attempt to connect to the database using the secret URI
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // if it fails, log the error and shut down the server immediately
        console.error(`Database connection error: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = connectDB;