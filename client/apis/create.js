import request from 'superagent'

export const getS3Url = async (file, token) => {
  const response = await request
    .get('/api/v1/create/s3Url')
    .set('Authorization', `Bearer ${token}`)
  const { uploadUrl } = response.body

  await request.put(uploadUrl).send(file)

  return response.body
}

export const create = async (animal, token) => {
  const response = await request
    .post('/api/v1/create')
    .set('Authorization', `Bearer ${token}`)
    .send(animal)

  return response.body
}
