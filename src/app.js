const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const v1 = require('../routes/v1')
const path = require('path')
const passport = require('passport')

const app = express()

//-------- DB CONNECT ---------//
 mongoose.connect(process.env.MONGODB_URL, {
     
 })
 mongoose.connection.on('connected', () => {
     console.log('Connected to database')
 })
 mongoose.connection.on('error', (err) => {
     console.error('faild to connect')
 })


//--------- middlewares ---------//

app.use(cors())

app.use(logger('dev'))
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

// app.use(passport.initialize())
// app.use(passport.session()) 
// require('./config/passport')(passport)

//--------- ROUTER ---------//


app.use('/api/v1', v1)



//--------- static files ---------//
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join('client/build')))
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'client','build', 'index.html')
        )
    })
}


//--------- ERROR ---------//


// app.use((req, res , next) => {
//     let err = new Error('Not found')
//     err.status = 404
//     next(err)
// })
// app.use((err, req, res, next) => {
//     const status = err.status || 500
//     const error = err.message || 'error process your request'

//     res.status(status).send({
//         error
//     })
// })


module.exports = app