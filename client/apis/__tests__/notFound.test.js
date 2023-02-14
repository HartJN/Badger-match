import nock from 'nock'
import { getNotFound } from '../notFound'

const shibeMockData = ['https://cdn.shibe.online/shibes/fakeshibe.jpg']

describe('GET /api/v1/NotFound', () => {
  it('gets the NotFound page content', async () => {
    expect.assertions(1)
    const scope = nock('https://shibe.online')
      .get('/api/shibes?count=1&urls=true&httpsUrls=true')
      .reply(200, shibeMockData)

    const resultContent = await getNotFound()
    expect(resultContent).toEqual(shibeMockData)
    scope.done()
  })
})
