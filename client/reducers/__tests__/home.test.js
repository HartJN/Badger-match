import { SET_HOME_CONTENT } from '../../actions/home'
import home from '../home'
import { homeContentMockData } from '../../../test/fake-data'

const [homeContentMockAnimal] = homeContentMockData

describe('home reducer', () => {
  it('returns the action payload for type SET_HOME_CONTENT.', () => {
    const action = {
      type: SET_HOME_CONTENT,
      payload: homeContentMockAnimal,
    }
    const initialState = {}
    const expectedState = homeContentMockAnimal
    const outputState = home(initialState, action)

    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toBe(initialState)
  })
  it('returns the default initial state for an undefined state and no action type.', () => {
    const expectedState = {}
    const outputState = home(undefined, {})

    expect(outputState).toEqual(expectedState)
  })
})
