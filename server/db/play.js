const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = { getUnratedBadgers }

function getUnratedBadgers(auth0_id, db = connection) {
  let reviewed = db('results').select('id').where('auth0_id', auth0_id)

  return db('animals')
    .whereNotIn('animals.id', reviewed)
    .select('id', 'auth0_id', 'name', 'description', 'image_url as imageUrl')
}
