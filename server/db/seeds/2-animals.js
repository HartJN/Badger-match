exports.seed = async (knex) => {
  await knex('animals').insert([
    {
      id: 1,
      auth0_id: '1',
      name: 'Bag Cat',
      description: 'Likes bags',
      image_url: '/images/bag-cat.jpg',
    },
    {
      id: 2,
      auth0_id: '1',
      name: 'Mug Pup',
      description: 'Lives in mugs',
      image_url: '/images/mug-pup.jpg',
    },
    {
      id: 3,
      auth0_id: '2',
      name: 'Elephant',
      description: 'Just happy to exist',
      image_url:
        'https://www.top5.com/wp-content/uploads/2018/08/cute-baby-animals-baby-elements.jpeg',
    },
    {
      id: 4,
      auth0_id: '3',
      name: 'Snow Fox',
      description: 'Wants a blanket',
      image_url:
        'https://www.top5.com/wp-content/uploads/2018/08/cute-baby-photos-fox-in-the-snow.png',
    },
    {
      id: 5,
      auth0_id: '3',
      name: 'grommit',
      description: 'I like cheese',
      image_url:
        'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80',
    },
    {
      id: 6,
      auth0_id: '1',
      name: 'wallace',
      description: 'I like cheese',
      image_url:
        'https://images.unsplash.com/photo-1595703013566-db085ae93c04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    },
  ])
}
