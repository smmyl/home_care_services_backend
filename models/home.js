const mongoose = require('mongoose')

const homeSchema = new mongoose.Schema({
    name: String,
    age: Number,
    language: String,
    familyMember: String,
    services: {
        clean: Boolean,
        food: Boolean,
        watch: Boolean
    },
    address: String
})

const Home = mongoose.model('Home', homeSchema)

module.exports = Home