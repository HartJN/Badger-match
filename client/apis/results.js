import request from 'superagent'

export function getResult(token) {
  return request
    .get('/api/v1/results/')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
}
