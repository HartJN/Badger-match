const knex = require('knex')
const testConfig = require('../knexfile').test
const testDb = knex(testConfig)

const { getAnimalById, addResult } = require('../final')

beforeAll(() => {
  return testDb.migrate.latest()
})
beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getAnimalById and addResult', () => {
  it('gets animal by id', () => {
    expect.assertions(3)
    return getAnimalById(1, testDb).then((finalResult) => {
      expect(finalResult.name).toBe('Bag Cat')
      expect(finalResult.description).toBe('Likes bags')
      expect(finalResult.imageUrl).toBe('/images/bag-cat.jpg')
    })
  })
  it('add new result to result table', () => {
    expect.assertions(1)
    const newResult = {
      auth0_id: 3,
      animal_id: 3,
      created: new Date(Date.now()),
      disposition: 'friend',
    }
    return addResult(newResult, testDb).then((id) => {
      expect(id[0]).toBe(7)
    })
  })
})
