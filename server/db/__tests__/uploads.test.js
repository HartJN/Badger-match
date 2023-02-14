const knex = require('knex')
const testConfig = require('../knexfile').test
const testDb = knex(testConfig)

const { getUploads } = require('../uploads')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getUploads', () => {
  it('gets the animal from the animals table in the database.', () => {
    expect.assertions(4)
    return getUploads(1, testDb).then((animals) => {
      expect(animals[1].name).toBe('Mug Pup')
      expect(animals[0].imageUrl).toBe('/images/bag-cat.jpg')
      expect(animals).toHaveLength(3)
      expect(animals[1].description).toBe('Lives in mugs')
    })
  })
})
