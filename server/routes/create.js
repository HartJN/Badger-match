const express = require('express')
const router = express.Router()
const { create } = require('../db/create')
const aws = require('aws-sdk')
const dotenv = require('dotenv')
dotenv.config()
const checkJwt = require('../auth0')
const crypto = require('crypto')

const region = process.env.AWS_REGION
const bucket = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const URL_EXPIRATION_SECONDS = 60

router.get('/s3Url', checkJwt, async (req, res) => {
  try {
    const s3 = new aws.S3({
      region,
      accessKeyId,
      secretAccessKey,
      signatureVersion: 'v4',
    })

    const imageName = `${crypto.randomBytes(16).toString('hex')}`
    const params = {
      Bucket: bucket,
      Key: imageName,
      Expires: URL_EXPIRATION_SECONDS,
    }

    const uploadUrl = s3.getSignedUrl('putObject', params)

    res.json({ uploadUrl, imageName })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth?.sub

    const { name, description, imageUrl } = req.body

    const createdAnimal = await create(auth0Id, name, description, imageUrl)
    res.status(200).json(createdAnimal)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router
