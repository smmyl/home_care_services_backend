const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
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

const Member = mongoose.model('Member', memberSchema)

module.exports = Member