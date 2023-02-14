const express = require('express')
const router = express.Router()
const checkJwt = require('../auth0.js')

const db = require('../db/final.js')

router.get('/:id', (req, res) => {
  const id = req.params.id
  db.getAnimalById(id)
    .then((finalResult) => {
      res.json(finalResult)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.post('/', checkJwt, (req, res) => {
  const auth0Id = req.auth?.sub
  const newResult = {
    ...req.body,
    auth0_id: auth0Id,
    created: new Date(Date.now()),
  }
  db.addResult(newResult)
    .then((ids) => {
      res.json(ids[0])
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

module.exports = router
