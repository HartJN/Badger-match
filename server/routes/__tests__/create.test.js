const request = require('supertest')
const server = require('../../server')
const { create } = require('../../db/create')
jest.spyOn(console, 'error')
const checkJwt = require('../../auth0')

jest.mock('../../db/create')
jest.mock('../../auth0.js')

beforeEach(() => {
  checkJwt.mockImplementation((req, res, next) => {
    ;(req.user = { sub: '999' }), next()
  })
})

afterEach(() => {
  console.error.mockReset()
})

describe('POST /api/v1/create', () => {
  it('should add a new animal to the database', async () => {
    expect.assertions(1)
    create.mockImplementation(() => Promise.resolve())
    const res = await request(server)
      .post('/api/v1/create')

      .send({
        name: 'Bag Cat',
        description: 'Likes bags',
        imageUrl: '/images/bag-cat.jpg',
        auth0Id: 1,
      })
    expect(res.status).toBe(200)
  })
  it('should return an error message when the database fails', async () => {
    create.mockImplementation(() => Promise.reject('Create Failed'))
    const res = await request(server)
      .post('/api/v1/create')

      .send({
        name: 'Bag Cat',
        description: 'Likes bags',
        imageUrl: '/images/bag-cat.jpg',
        auth0Id: 1,
      })
    expect(res.status).toBe(500)
  })
})

describe('GET /api/v1/create/s3Url', () => {
  it('should return status 200 and a url when successful', async () => {
    create.mockImplementation(() => Promise.resolve())
    const res = await request(server).get('/api/v1/create/s3Url')

    expect(res.status).toBe(200)
  })
})
