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
    connectDB(db)
}



//Routes
app.get('/',(req, res) => res.send('Funcionando'))
app.use('/user',require('./routes/api/user'))
app.use('/auth', require('./routes/api/auth'))
app.use('/topic', require('./routes/api/topic'))
app.use('/post', require('./routes/api/post'))
app.use('/like', require('./routes/api/like'))
app.use('/dislike', require('./routes/api/dislike'))
app.use('/education', require('./routes/api/education'))



const server = app.listen(PORT, () => console.log(`Porta ${PORT}`) )


module.exports = {app , server}