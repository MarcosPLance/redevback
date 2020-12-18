const express = require('express')
const router = express.Router()
const Topic = require('../../models/topic')


router.post('/', async(req, res, next) =>{
    try{
        let topic = new Topic(req.body)
        await topic.save()
        if(topic.id){
            res.json(topic)
        }
    }catch(err){
        console.error(err.message)
        res.status(500).send("Falta conteudo")
    }
})

router.get('/', async (req, res, next) => {
    try {
        const topics = await Topic.find({})
        res.json(topics)
    } catch (err) {
      res.status(500).send("Faltando algo")
    }
})

module.exports = router