const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://mawmawtee:n4KG0M9NDqyWSajW@cluster0-jzimm.mongodb.net/exprensetracker?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    } catch (error) {
        console.log(`Error: ${error.message}`.red)
        process.exit(1)
    }
}

module.exports = connectDB