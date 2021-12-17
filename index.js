if(process.env.NODE_ENV !== 'production') require('dotenv').config()
const app = require('./src/app')

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`server is working in port ${PORT}`))