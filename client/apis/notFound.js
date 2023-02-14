import request from 'superagent'


// GET /api/v1/notfound
export function getNotFound() {
  return request.get('https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true').then((res) => {
    return res.body
  })
}