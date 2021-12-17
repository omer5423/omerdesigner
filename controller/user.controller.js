const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const userController = {}

userController.register = async (req, res, next) => {
    const {name , password , email , joined} = req.body
    const newUser = new User({
        name , password , email , joined
    })
    try{
        const user = await newUser.save()
        return res.send({user})
    } catch(e){
        if(e.code === 11000 && e.name === "MangoError") {
            var error = new Error(`Email address ${newUser.email} is alreadu taken`)
            next(error)
        }
        next(e)
    }
    
}
userController.login = async (req, res, next) => {
    const { email , password } = req.body
    try{
        const user = await User.findOne({email})
        if(!user) {
            const err = new Error( `the email ${email } is not found`)
            err.status = 401
            res.send({
                message : `the email ${email } is not found`
            })
            next(err)  
        } else {
            user.isPassword(password, user.password, (err, match) => {
                if(match) {
                    // const secret = process.env.JWT_SECRET
                    // const expire = process.env.JWT_EXPIRATION
                    // const token = jwt.sign({_id:user._id}, secret, { expiresIn: expire})
                    // res.send({ token })
                    res.send({
                        message : 'login success'
                    })
                }
                res.status(401).send({
                    error : 'invalid username/password '
                })
                next(err)
            })
        
        }
        
    } catch(e){
        next(e)
    }
    
}

module.exports = userController