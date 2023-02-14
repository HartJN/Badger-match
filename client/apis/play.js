import request from 'superagent'

export function getAnimals(token) {
  return request
    .get(`/api/v1/play/`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
    .catch((e) => console.log(e))
}
