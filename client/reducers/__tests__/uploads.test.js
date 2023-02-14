import { SHOW_UPLOADS } from '../../actions/uploads'
import uploadReducer from '../uploads'
import { homeContentMockData } from '../../../test/fake-data'

describe('uploads reducer', () => {
  it('returns the action payload for type SHOW_UPLOADS.', () => {
    const action = {
      type: SHOW_UPLOADS,
      payload: homeContentMockData,
    }
    const initialState = []
    const expectedState = homeContentMockData
    const outputState = uploadReducer(initialState, action)

    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toBe(initialState)
  })
  // enable once we have backend redux wired up
  it('returns the default initial state for an undefined state and no action type.', () => {
    const expectedState = []
    const outputState = uploadReducer(undefined, {})

    expect(outputState).toEqual(expectedState)
  })
})
