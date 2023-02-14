import { SHOW_RESULTS } from '../../actions/results'
import results from '../results'

const resultsContentMockData = [{
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

describe('results reducer', () => {
  it('returns the action payload for type SHOW_RESULTS.', () => {
    const action = {
      type: SHOW_RESULTS,
      payload: resultsContentMockData,
    }
    const initialState = []
    const expectedState = resultsContentMockData
    const outputState = results(initialState, action)

    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toBe(initialState)
  })
  it('returns the default initial state for an undefined state and no action type.', () => {
    const expectedState = []
    const outputState = results(undefined, {})

    expect(outputState).toEqual(expectedState)
  })
})