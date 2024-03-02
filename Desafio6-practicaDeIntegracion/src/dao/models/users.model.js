const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const usersCollection = 'users'

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    admin: {
        type: Boolean,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}) 
usersSchema.plugin(mongoosePaginate)

const userModel = mongoose.model(usersCollection, usersSchema)

module.exports = {
    userModel
}