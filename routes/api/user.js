const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const file = require('../../midleware/file')
const auth = require('../../midleware/auth')
const User = require('../../models/user')
const {check, validationResult} = require('express-validator')
const { findByIdAndDelete, find } = require('../../models/user')


//@post     inclusao de usuarios
//@access   publico
router.post('/',[
    check('email').isEmail(),
    check('password').isLength({min: 5}),
    check('name').not().isEmpty(),
    check('username').not().isEmpty()
], file, async (req, res, next) => {
    try{
        let password = req.body.password

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errrors: errors.array()})
        }else{
            let usuario = new User(req.body)
            if(req.body.picture_name){
                usuario.picture = `user/${req.body.picture_name}`
            }
            const salt = await bcrypt.genSalt(10)
            usuario.password = await bcrypt.hash(password, salt)
            await usuario.save()
            if(usuario.id){
                res.json(usuario)
            }
        }
    }catch(err){
        res.status(500).send("Falta algum dado")
    }
})


router.get('/', async(req, res, next) =>{
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        console.error(err.message)
    }
})

router.delete('/:id', async(req, res, next) =>{
    try{
    const id = req.params.id
    const user = await User.findByIdAndDelete({_id: id})

    if(user){
        res.send("Usuario excluido")
    } else {
        res.status(404).send("Exclusão não efetuada")
      }
    }catch(err){
        console.error(err.message)
    }
})


module.exports = router