import nock from 'nock'
import { getUploads } from '../uploads'

const uploads = [
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
]

describe('GET /api/v1/uploads', () => {
  it('gets the uploads page content', async () => {
    expect.assertions(1)
    const scope = nock('http://localhost')
      .get('/api/v1/uploads/')
      .reply(200, uploads)

    const uploadContent = await getUploads()
    expect(uploadContent).toEqual(uploads)
    scope.done()
  })
})
