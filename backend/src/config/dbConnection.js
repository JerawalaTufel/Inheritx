require("dotenv").config()
const mongoose = require("mongoose");

const Connection = async () => {
    try {
        const mongo = await mongoose.connect(process.env.MONGO_URL,{
        });
        console.log(`db connection on ${mongo.connection.host}`);
        
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
module.exports = Connection