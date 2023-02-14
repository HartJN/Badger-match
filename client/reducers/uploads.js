const initialRequestState = []

const uploadReducer = (state = initialRequestState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SHOW_UPLOADS':
      return payload
    default:
      return state
  }
}

export default uploadReducer