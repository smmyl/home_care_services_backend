const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    name: String,
    age: Number,
    language: String,
    familyMember: String,
        clean: {type: Boolean, default: false},
        food: {type: Boolean, default: false},
        watch: {type: Boolean, default: false},
    address: String,
    image: String
})

const Member = mongoose.model('Member', memberSchema)

module.exports = Member