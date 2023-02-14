import nock from 'nock'
import { getAnimalById, postResult } from '../final'

const animalByIdMockData = {
  id: 2,
  auth0_id: '1',
  name: 'Mug Pup',
  description: 'Lives in mugs',
  image_url: '/images/mug-pup.jpg',
}

const resultMockData = {
  auth0_id: 1,
  animal_id: 1,
  created: new Date(Date.now()),
  disposition: 'friend',
}

const resultReturnedId = { id: 2 }

describe('GET /api/v1/final/:id', () => {
  it('get the animal data by id', async () => {
    expect.assertions(1)
    const scope = nock('http://localhost')
      .get('/api/v1/final/2')
      .reply(200, animalByIdMockData)

    const animalData = await getAnimalById(2)
    expect(animalData).toEqual(animalByIdMockData)
    scope.done()
  })
})

describe('POST /api/v1/final', () => {
  it('post the result back to db', async () => {
    expect.assertions(1)
    const scope = nock('http://localhost')
      .post('/api/v1/final')
      .reply(200, resultReturnedId)

    const newResult = await postResult(resultMockData)
    expect(newResult).toEqual(resultReturnedId)
    scope.done()
  })
})
