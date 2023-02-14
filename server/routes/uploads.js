const express = require('express')
const checkJwt = require('../auth0.js')
const db = require('../db/uploads.js')
const router = express.Router()

//GET /api/v1/uploads
router.get('/', checkJwt, (req, res) => {
  const auth0id = req.auth?.sub
  db.getUploads(auth0id)
    .then((uploads) => {
      res.json(uploads)
    })
    .catch((err) => {
      console.error(err.message)
      res.sendStatus(500)
    })
})

module.exports = router
