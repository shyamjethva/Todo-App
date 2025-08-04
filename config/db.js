const mongoose = require('mongoose')
const colors = require('colors')

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_url)
        console.log(`Connected To MongoDB ${mongoose.connection.host}`.bgBlue);
    } catch (error) {
        console.log(`MongoDb Error ${error}`.bgRed);
    }
}

module.exports = connectDb;