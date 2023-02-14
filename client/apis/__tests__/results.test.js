import nock from 'nock'
import { getResult } from '../results'

const resultContentMockData = [{
  name: 'Penguin',
  imageUrl: '/penguin.png',
  description: `I'm a lovely penguin`,
  disposition: 'friend'
},
{
  name: 'Puppy',
  imageUrl: '/puppy.png',
  description: `I'm a naughty puppy`,
  disposition: 'foe'
},
{
  name: 'Potato',
  imageUrl: '/potato.png',
  description: `I'm a stud I mean spud`,
  disposition: 'friend'
}]

describe('GET /api/v1/results', () => {
  it('gets the results page content', async () => {
    expect.assertions(1)
    const scope = nock('http://localhost')
      .get('/api/v1/results/')
      .reply(200, resultContentMockData)

    const resultContent = await getResult()
    expect(resultContent).toEqual(resultContentMockData)
    scope.done()
  })
})