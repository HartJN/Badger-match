import { REPLACE_ANIMALS, updateAnimals } from '../play'

const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

const animalContentMockData = {
  id: 1,
  uploaderId: 'mockID',
  name: 'mockName',
  description: 'mockCaptionText',
  imageUrl: 'mockImageUrl',
}

describe('fetchHomeContent', () => {
  it('dispatches the SET_HOME_CONTENT action.', () => {
    updateAnimals(animalContentMockData)(fakeDispatch)
    expect(fakeDispatch).toHaveBeenCalledWith({
      type: REPLACE_ANIMALS,
      payload: animalContentMockData,
    })
  })
})
