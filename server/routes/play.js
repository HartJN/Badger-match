const express = require('express')
const checkJwt = require('../auth0.js')

// eslint-disable-next-line no-unused-vars
const db = require('../db/play')

const router = express.Router()

module.exports = router

router.get('/', checkJwt, (req, res) => {
  const auth0id = req.auth?.sub

  db.getUnratedBadgers(auth0id)
    .then((products) => {
      res.json(products)
    })
    .catch((error) => {
      console.error(error.message)
      res.status(500).json({ message: 'Something went wrong!' })
    })
})
