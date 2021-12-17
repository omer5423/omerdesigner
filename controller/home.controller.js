const Teams = require('../models/home.model')
const nodemailer = require('nodemailer')
const multer = require('multer')

const homeController = {}

// const storage = multer.diskStorage({
//     destination: (req , file , callback) => {
//         callback(null, '../client/public/upload')
//     },
//     filename: (req , file , callback) => {
//         callback(null, file.originalname)
//     }
// })

// const upload = multer({storage})

// homeController.addTeam = async (req, res, next) => {
//     const {name , email  ,  description} = req.body
//     const addImage = req.file.originalname
//     const newPerson = new Teams({
//         name, email,addImage,  description
//     })
//     try{
//         const person = await newPerson.save()
//         return res.send({
//             person
//         })
//     } catch(e){
//         next(e)
//     }
// }
homeController.contact = async (req, res, next) => {
    const {name , lastname , email , message} = req.body
    // if(name) {
    // res.send({message: 'message sent', name})
    // }
    try {
                // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'omer.ali.5423@gmail.com', // generated ethereal user
                    pass: 'omer0995533275', // generated ethereal password
                },
            });

            let mailOption = {
                from: email,
                to:'omer.ali.5423@gmail.com',
                subject:'header message',
                html:`
                    <h3>information</h3>
                    <ul>
                        <li>Name: ${name}</li>
                        <li>last name: ${lastname}</li>
                        <li>email: ${email}</li>
                    </ul>

                    <h3>message</h3>
                    <p>${message}</p>
                `
            }
            
            await transporter.sendMail(mailOption, (error,info) => {
                if (error) {
                    console.log('Email has not sent', error)
                    return res.send({
                        error: 'error in sending mail' 
                    })
                } else {
                    console.log('Email sent', info)
                    return res.send({
                        message: 'Email sent'
                    })
                }
            })
    } catch (error) {
        res.send(error)
    }

    let testAccount = await nodemailer.createTestAccount();

    
}




module.exports = homeController