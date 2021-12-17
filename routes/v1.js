const express = require('express')
const Teams = require('../models/home.model')
const userController = require('../controller/user.controller')
const homeController = require('../controller/home.controller')
const nodemailer = require('nodemailer')
const multer = require('multer')
const passport = require('passport')

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req , file , callback) => {
        callback(null, '../client/public/upload')
    },
    filename: (req , file , callback) => {
        callback(null, Date.now()  + '_' + file.originalname)
    }
})

const upload = multer({storage :storage})


router.get('/home',  async (req, res, next) => {
     return res.send({
        massage: 'hello home',
        name: 'omer'
    })
})
router.post('/contact', homeController.contact)
router.post('/addTeams',upload.single('addImage'), async (req, res, next) => {
    const {name , email  ,  description} = req.body
    const image = req.file.originalname
    const newPerson = new Teams({
        name, email,image,  description
    })
    try{
        const person = await newPerson.save()
        return res.send({
            person
        })
    } catch(e){
        next(e)
    }
}
)
router.post('/register', userController.register)
router.post('/login', userController.login)


module.exports = router