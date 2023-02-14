import nock from 'nock'
import { create, getS3Url } from '../create'

const createContentMockData = {
  name: 'Borris',
  description: 'Likes stuff',
  imageUrl: '/images/boris.jpg',
}

const fakeToken = 'anything'

const fetchUrlMockData = {
  uploadUrl:
    'https://badgermatch.s3.ap-southeast-2.amazonaws.com/16693&X-Amz-SignedHeaders=host',
  imageName: '/images/boris.jpg',
}

describe('create', () => {
  it('should add a new animal to the database', async () => {
    expect.assertions(2)
    const scope = nock('http://localhost')
      .post('/api/v1/create')
      .reply(200, { ...createContentMockData, token: fakeToken })
    const res = await create(createContentMockData)
    expect(res).toEqual({ ...createContentMockData, token: fakeToken })
    expect(scope.isDone()).toBeTruthy()
  })
})

describe('getS3Url', () => {
  it('should return a uploadUrl', async () => {
    expect.assertions(3)
    const scope = nock('http://localhost')
      .get('/api/v1/create/s3Url')
      .reply(200, { ...fetchUrlMockData, token: fakeToken })
    const uploadScope = nock(
      'https://badgermatch.s3.ap-southeast-2.amazonaws.com'
    )
      .put('/16693&X-Amz-SignedHeaders=host')
      .reply(200)
    const res = await getS3Url(createContentMockData, fakeToken)
    expect(res).toEqual({ ...fetchUrlMockData, token: fakeToken })
    expect(scope.isDone()).toBeTruthy()
    expect(uploadScope.isDone()).toBeTruthy()
  })
})
