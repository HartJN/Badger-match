const express = require('express')
const checkJwt = require('../auth0.js')
const db = require('../db/results.js')
const router = express.Router()

//api/v1/results/
router.get('/', checkJwt, (req, res) => {
  // TODO: auth0id is hardcoded for now until auth is set up
  const auth0id = req.auth?.sub

  db.getResult(auth0id)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.error(err.message)
      res.sendStatus(500)
    })
})

module.exports = router
