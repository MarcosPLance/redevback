const express = require('express')
const router = express.Router()
const auth = require('../../midleware/auth')
const Post = require('../../models/post')



router.post('/', auth, async(req, res, next) => {
    try{
        req.body.author = req.user.id
        let post = new Post(req.body)
        await post.save()

        if(post.id){
            res.json(post)
        }
    }catch(err){
        console.error(err.message)
        res.status(500).send("Falta conteudo")
    }
})

router.get('/', auth, async(req, res, next) => {
    try {
         const post = await Post.aggregate([
           {
               $project: {
                   _id: '$_id',
                   author: '$author',
                   author_picture: '$author.picture',
                   content: '$content',
                   topic : '$topic',
                   count_dislikes: '$dislikes',
                   count_likes: '$likes',               
              }
            }
       ])
       //const post = await Post.find({})
       await Post.populate(post, {path: "author topic"});
       res.json(post)
    } catch (err) {
        console.error(err.message)
      res.status(500).send( "error")
    }
})

router.delete('/', auth, async (req, res, next) => {
    try {
      const post_id = req.body.id
      const post = await Post.findOneAndDelete({ _id : post_id, author: req.user.id })
      if (post) {
        res.json(post)
      } else {
        res.status(404).send({ "error": "user not found" })
      }
    } catch (err) {
        console.error(err.message)
      res.status(500).send("Falta algo")
    }
  })


module.exports = router