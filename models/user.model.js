const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose

const UserSchema = Schema({
    name: { 
        type: String,
        
    },
    email: { 
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    joined: { 
        type: Date,
        default: new Date()
    }
}) 

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next()
    }
    try{ 
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash
        next()
    }catch(e){
        return next(e)
    }
    
})
UserSchema.methods.isPassword = function(password, hashed, callback){
    bcrypt.compare(password, hashed, (err, success) => {
        if(err){
            return callback(err)
    }
        callback(null, success)
    })
}

const User = mongoose.model('User', UserSchema)

module.exports = User





