const connection = require('./connection')

const create = (auth0Id, name, description, imageUrl) => {
  return connection('animals').insert({
    auth0_id: auth0Id,
    name,
    description,
    image_url: imageUrl,
  })
}

module.exports = { create }
