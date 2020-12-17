const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = function(req, res, next){
    const jwtSecret = process.env.jwtSecret || config.get('jwtSecret')

    const token = req.header('x-auth-token')

    if(!token){
        return res.status(401).json("Sem token")
    }

    try{
        jwt.verify(token, jwtSecret, (error, decoded) =>{
            if(error){
                return res.status(401).json("Token invalido")
            }
            req.user = decoded.user
            next()
        })
    }catch(err){
        console.error(err)
        res.status(500).json("Falta alguma coisa")
    }
}