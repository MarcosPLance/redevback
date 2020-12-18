const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const auth = require('../../midleware/auth')

router.post('/', auth, async (req, res, next) => {
    try {
      const id = req.user.id
      const profile = await User.findByIdAndUpdate(id , { $push: { education: req.body } }, { new: true })
      if (profile) {
        res.json(profile)
      } else {
        res.status(404).send({ "error": "user not found" })
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Faltam dados" )
    }
  })

  router.delete('/', auth, async (req, res, next) => {
    try {
      const id = req.user.id
      const profile = await User.findByIdAndUpdate(id, { $pull: { education: req.body } }, { new: true })
      if (profile) {
        res.json(profile)
      } else {
        res.status(404).send({ "error": "user not found" })
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": "Server Error" })
    }
  })
  

  module.exports = router