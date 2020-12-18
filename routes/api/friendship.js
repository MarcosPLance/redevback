const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const auth = require('../../midleware/auth')


router.post('/', auth, async(req, res, next) => {
    try {
        data = req.body
        let user = await User.findById(req.user.id)
        user.friendships.push(req.body.id)
        await user.save().then(t => t.populate({path: 'friendships', select: 'name picture username'}).execPopulate())
        if (user.id){
            res.json(user.friendships)
        }
    } catch (err) {
      res.status(500).send({ "error": err.message })
    }
})

router.delete('/', auth, async(req, res, next) => {
    try {
        data = req.body
        const user = await User.findById(req.user.id).populate('friendships')
        user.friendships.pull(req.body.id)
        await user.save()
        if (user.id){
            res.json(user.friendships)
        }
    } catch (err) {
      res.status(500).send({ "error": err.message })
    }
})



module.exports = reouter