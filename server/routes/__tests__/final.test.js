const request = require('supertest')
const server = require('../../server')
const checkJwt = require('../../auth0')

const { getAnimalById, addResult } = require('../../db/final.js')
jest.spyOn(console, 'error')

beforeEach(() => {
  checkJwt.mockImplementation((req, res, next) => {
    ;(req.user = { sub: '999' }), next()
  })
})

jest.mock('../../auth0.js')
jest.mock('../../db/final.js')

afterEach(() => {
  console.error.mockReset()
})

const getAnimalByIdData = {
  id: 1,
  animal_id: 2,
  name: 'Bag Cat',
  description: 'Likes bags',
  image_url: '/images/bag-cat.jpg',
  created: 1669152197438,
  disposition: 'friend',
}

const addNewResultData = {
  animal_id: 1,
  disposition: 'friend',
}

describe('GET /api/vi/final/:id', () => {
  it('should return status 200 and a joint table when successful', () => {
    expect.assertions(3)
    getAnimalById.mockReturnValue(Promise.resolve(getAnimalByIdData))
    return request(server)
      .get('/api/v1/final/1')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(getAnimalById).toHaveBeenCalledWith('1')
        expect(res.body).toEqual(getAnimalByIdData)
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(3)
    getAnimalById.mockImplementation(() => Promise.reject('Get Failed'))
    return request(server)
      .get('/api/v1/final/1')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Get Failed')
        expect(res.text).toContain('Something went wrong')
      })
  })
})

describe('POST /api/v1/final/', () => {
  it('should return status 200 and an updated table when successful', () => {
    expect.assertions(1)
    addResult.mockImplementation(() => Promise.resolve(addNewResultData))
    return request(server)
      .post('/api/v1/final')
      .send(addNewResultData)
      .then((res) => {
        expect(res.status).toBe(200)
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(3)
    addResult.mockImplementation(() => Promise.reject('Post Failed'))
    return request(server)
      .post('/api/v1/final')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Post Failed')
        expect(res.text).toContain('Something went wrong')
      })
  })
})
