import { getResult } from '../apis/results'

export const SHOW_RESULTS = 'SHOW_RESULTS'

export function showResult(user) {
  return {
    type: 'SHOW_RESULTS',
    payload: user,
  }
}

export function fetchResults(token) {
  return (dispatch) => {
    return getResult(token)
      .then((result) => {
        dispatch(showResult(result))
        return null
      })
      .catch((err) => console.error(err.message))
  }
}
