const request = require('supertest')
const server = require('../../server')
const db = require('../../db/play')
const checkJwt = require('../../auth0')

jest.mock('../../auth0.js')

jest.mock('../../db/play')
jest.spyOn(console, 'error').mockImplementation(() => {})

beforeEach(() => {
  checkJwt.mockImplementation((req, res, next) => {
    ;(req.user = { sub: '999' }), next()
  })
  jest.resetAllMocks()
})

describe('get /api/v1/play', () => {
  test('returns animals not reviewed', () => {
    const fakeAnimalDisplay = [
      {
        id: 1,
        auth0_id: '3',
        name: 'grommit',
        description: 'I like cheese',
        image_url: 'https://www.definitely-an-animal.jpeg',
      },
      {
        id: 2,
        auth0_id: '3',
        name: 'wallace',
        description: 'I like cheese',
        image_url: 'https://www.definitely-an-animal-but-human.jpeg',
      },
    ]
    db.getUnratedBadgers.mockReturnValue(Promise.resolve(fakeAnimalDisplay))
    const auth0_id = 1 // Replace this when auth0 has been implemented.
    return request(server)
      .get('/api/v1/play')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual(fakeAnimalDisplay)
        expect(db.getUnratedBadgers).toHaveBeenCalledWith(auth0_id)
      })
  })
  test('returns 500 and logs error message when error', () => {
    db.getUnratedBadgers.mockImplementation(() =>
      Promise.reject(new Error('shucks its broken'))
    )
    return request(server)
      .get('/api/v1/play')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong!')
        expect(console.error).toHaveBeenCalledWith('shucks its broken')
      })
  })
})
