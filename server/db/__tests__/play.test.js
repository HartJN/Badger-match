const knex = require('knex')
const testConfig = require('../knexfile').test
const testDb = knex(testConfig)

const { getUnratedBadgers } = require('../play')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getUnRatedAnimals', () => {
  it('gets the animal that have not been rated.', () => {
    expect.assertions(4)
    let auth0_id = 1 // Will need to be updated once AUTH0 added.
    let animalExpected = [
      {
        id: 4,
        uploaderId: '3',
        name: 'Snow Fox',
        description: 'Wants a blanket',
        imageUrl:
          'https://www.top5.com/wp-content/uploads/2018/08/cute-baby-photos-fox-in-the-snow.png',
      },
    ]
    return getUnratedBadgers(auth0_id, testDb).then((animals) => {
      expect(animals[0].imageUrl).toBe(animalExpected[0].imageUrl)
      expect(animals[0].description).toBe(animalExpected[0].description)
      expect(animals[0].uploaderId).toBe(animalExpected[0].uploaderId)
      expect(animals).toHaveLength(3)
    })
  })
})
