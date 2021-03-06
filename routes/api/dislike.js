const express = require('express')
const router = express.Router()
const Post = require('../../models/post')
const auth = require('../../midleware/auth')

router.post('/:id', auth ,async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, 
            { $addToSet: { dislikes: req.user.id } }, { new: true })
        if (post) {
          res.json(post);
        }else {
            res.status(404).send({ "error": "post not found" })
        }
    } catch (err) {
      res.status(500).send({ "error": err.message })
    }
})


router.delete('/:id', auth ,async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, 
            { $pull: { dislikes: req.user.id } }, { new: true })
        if (post) {
          res.json(post);
        }else {
            res.status(404).send({ "error": "post not found" })
        }
    } catch (err) {
      res.status(500).send({ "error": err.message })
    }
})


module.exports = router