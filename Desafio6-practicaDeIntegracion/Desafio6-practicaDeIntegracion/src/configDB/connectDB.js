const mongoose = require("mongoose")

exports.connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://BackEnd:Ari123@cluster0.klfc1nb.mongodb.net/?retryWrites=true&w=majority')
        // await mongoose.connect('mongodb://127.0.0.1:27017/c50010')
        console.log('Base de datos conectada')        
    } catch (error) {
        console.log(error)
    }
}