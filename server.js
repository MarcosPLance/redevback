const express = require('express')
const app = express()
const connectDB = require('./config/db')
var bodyparser = require('body-parser')
var cors = require('cors')
const fileUpload = require('express-fileupload')
const config  = require('config')
const PORT = process.env.PORT || 3003


//midleware
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use('/uploads', express.static('uploads'))

app.use(fileUpload({
    createParentPath: true
}))


//Connect database
const debug = process.env.DEBUG || config.get('DEBUG')
if(debug){
    connectDB()    
}else{
    const db = process.env.mongoTestURI || config.get('mongoTestURI')
    connectDB()
}



//Routes
app.use('/',require('./routes/api/main'))
app.use('/user',require('./routes/api/user'))


app.listen(PORT, () => console.log(`Porta ${PORT}`) )