const mongoose = require('mongoose')

const { Schema } = mongoose

const teamsSchema = Schema({
    name: { 
        type: String,
        required: true
    },
    addImage: { 
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
        index: true,
    },
    description: { 
        type: String,
        required: true
    }
}) 


const Teams = mongoose.model('team', teamsSchema)

module.exports = Teams