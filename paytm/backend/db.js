require('dotenv').config()

const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGO_URL
mongoose.connect(MONGODB_URL);


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    }
})


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    balance: {
        type: Number,
        min: 0,
        required: true
    }
})

const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', accountSchema)

module.exports = {
    User,
    Account
}