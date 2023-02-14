import request from 'superagent'

export function getUploads(token) {
  return request
    .get('/api/v1/uploads/')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
}
