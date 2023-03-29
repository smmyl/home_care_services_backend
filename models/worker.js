const mongoose = require('mongoose')

const workerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    language: String,
    image: String
})

const Worker = mongoose.model('Worker', workerSchema)

module.exports = Worker