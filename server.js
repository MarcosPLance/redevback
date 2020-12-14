const express = require('express')
const app = express()
const connectDB = require('./config/db')
var bodyparser = require('body-parser')
var cors = require('cors')
const fileUpload = require('express-fileupload')
const PORT = process.env.PORT || 3003


//midleware
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())


//Connect database
connectDB()

//Routes
app.use('/',require('./routes/api/main'))
app.use('/',require('./routes/api/user'))


app.listen(PORT, () => console.log(`Porta ${PORT}`) )