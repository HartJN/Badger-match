const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = {
  getResult
}

function getResult(auth0id, db = connection) {
  return db('results')
  .join('animals', 'results.animal_id', 'animals.id')
  .where('results.auth0_id', auth0id).select()
  .select(
    'results.id as id',
    'results.auth0_id as auth0Id',
    'results.animal_id as animalId',
    'results.created',
    'results.disposition',
    'animals.name',
    'animals.description',
    'animals.image_url as imageUrl'
  )
}