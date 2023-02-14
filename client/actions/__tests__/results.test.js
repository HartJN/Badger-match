import { fetchResults, SHOW_RESULTS } from '../results'
import { getResult } from '../../apis/results'

jest.mock('../../apis/results')

const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

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

describe('fetchResults', () => {
  it('dispatches the SHOW_RESULTS action.', () => {
    getResult.mockReturnValue(Promise.resolve(resultContentMockData))
    return fetchResults()(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: SHOW_RESULTS,
        payload: resultContentMockData,
      })
    })
  })
  it('should console.error() if api request fails.', () => {
    expect.assertions(1)
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
    getResult.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return fetchResults()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('Something went wrong')
    })
  })
})
