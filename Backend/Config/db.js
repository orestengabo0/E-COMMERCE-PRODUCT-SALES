const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to MongoDB: ${conn.connection.host}`)
    }
    catch(ex) {
        console.error("Error connecting: ", ex.message)
        process.exit(1)
    }
}
module.exports = connectDB