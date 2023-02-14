const initialRequestState = []

const resultReducer = (state = initialRequestState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SHOW_RESULTS':
      return payload
    default:
      return state
  }
}

export default resultReducer
