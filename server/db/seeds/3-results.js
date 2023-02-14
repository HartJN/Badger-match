exports.seed = async (knex) => {
  await knex('results').insert([
    {
      id: 1,
      auth0_id: 1,
      animal_id: 1,
      created: new Date(Date.now()),
      disposition: 'friend',
    },
    {
      id: 2,
      auth0_id: 1,
      animal_id: 2,
      created: new Date(Date.now()),
      disposition: 'foe',
    },
    {
      id: 3,
      auth0_id: 1,
      animal_id: 3,
      created: new Date(Date.now()),
      disposition: 'friend',
    },
    {
      id: 4,
      auth0_id: 2,
      animal_id: 2,
      created: new Date(Date.now()),
      disposition: 'friend',
    },
    {
      id: 5,
      auth0_id: 2,
      animal_id: 3,
      created: new Date(Date.now()),
      disposition: 'foe',
    },
    {
      id: 6,
      auth0_id: 3,
      animal_id: 3,
      created: new Date(Date.now()),
      disposition: 'friend',
    },
  ])
}
