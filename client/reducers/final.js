import { SET_ANIMAL, ADD_RESULT } from '../actions/final'

const initialState = {}

const final = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_ANIMAL:
      return payload

    case ADD_RESULT:
      return { ...state, disposition: payload.disposition }

    default:
      return state
  }
}

export default final
