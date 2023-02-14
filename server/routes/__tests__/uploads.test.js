const request = require('supertest')
const server = require('../../server')
const checkJwt = require('../../auth0')

const { getUploads } = require('../../db/uploads')
jest.mock('../../auth0.js')

jest.mock('../../db/uploads')

jest.spyOn(console, 'error').mockImplementation(() => {})

beforeEach(() => {
  checkJwt.mockImplementation((req, res, next) => {
    ;(req.user = { sub: '999' }), next()
  })
  jest.resetAllMocks()
})

const getAnimalsMockData = [
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
]

describe('GET /api/v1/uploads/', () => {
  it('should return status 200 and uploads when database is successful.', () => {
    expect.assertions(2)
    getUploads.mockReturnValue(Promise.resolve(getAnimalsMockData))
    return request(server)
      .get('/api/v1/uploads/')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual(getAnimalsMockData)
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(2)
    getUploads.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .get('/api/v1/uploads/')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Something went wrong')
      })
  })
})
