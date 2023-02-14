import fetchUploads, { SHOW_UPLOADS } from '../uploads'
import { getUploads } from '../../apis/uploads'
import { homeContentMockData } from '../../../test/fake-data'

jest.mock('../../apis/uploads')

const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Uploads page', () => {
  it('dispatches the SHOW_UPLOADS action.', () => {
    getUploads.mockReturnValue(Promise.resolve(homeContentMockData))
    return fetchUploads()(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: SHOW_UPLOADS,
        payload: homeContentMockData,
      })
    })
  })
  it('should console.error() if api request fails.', () => {
    expect.assertions(2)
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
    getUploads.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    ) 
    return fetchUploads()(fakeDispatch).finally(() => {
      expect(fakeDispatch).toHaveBeenCalledTimes(0)
      expect(console.error).toHaveBeenCalledWith('Something went wrong')
    })
  })
})
