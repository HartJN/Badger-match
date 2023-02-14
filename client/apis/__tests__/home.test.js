import nock from 'nock'
import { getHomeContent } from '../home'
import { homeContentMockData } from '../../../test/fake-data'

const [homeContentMockAnimal] = homeContentMockData

describe('GET /api/v1/home', () => {
  it('gets the home page content', async () => {
    expect.assertions(1)
    const scope = nock('http://localhost')
      .get('/api/v1/home')
      .reply(200, homeContentMockAnimal)

    const homeContent = await getHomeContent()
    expect(homeContent).toEqual(homeContentMockAnimal)
    scope.done()
  })
})
