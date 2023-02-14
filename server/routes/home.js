const express = require('express')

const { getRandomAnimal } = require('../db/home')

const router = express.Router()

// GET /api/v1/home/
router.get('/', (req, res) => {
  getRandomAnimal()
    .then((animal) => {
      res.json(animal)
    })

    .catch((error) => {
      console.error(error.message)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

module.exports = router
