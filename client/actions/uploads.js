import { getUploads } from '../apis/uploads'

export const SHOW_UPLOADS = 'SHOW_UPLOADS'

export function showUploads(user) {
  return {
    type: 'SHOW_UPLOADS',
    payload: user,
  }
}

export default function fetchUploads(token) {
  return (dispatch) => {
    return getUploads(token)
      .then((user) => {
        dispatch(showUploads(user))
        return null
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}
