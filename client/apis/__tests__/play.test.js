import nock from 'nock'
import { getAnimals } from '../play'

const playAnimalsMockData = [
  {
    id: 1,
    uploaderId: 'mockID',
    name: 'mockName',
    description: 'mockCaptionText',
    imageUrl: 'mockImageUrl',
  },
  {
    id: 2,
    uploaderId: 'mockID',
    name: 'mockName',
    description: 'mockCaptionText',
    imageUrl: 'mockImageUrl',
  },
  {
    id: 3,
    uploaderId: 'mockID',
    name: 'mockName',
    description: 'mockCaptionText',
    imageUrl: 'mockImageUrl',
  },
]

describe('GET /api/v1/play/', () => {
  it('gets the play page content', async () => {
    expect.assertions(2)
    const scope = nock('http://localhost')
      .get('/api/v1/play/')
      .reply(200, playAnimalsMockData)

    const animalsNotRated = await getAnimals(1)
    expect(animalsNotRated).toEqual(playAnimalsMockData)
    expect(animalsNotRated).toHaveLength(3)
    scope.done()
  })
})
