import React from 'react'
import '@testing-library/jest-dom'
import { screen, render, waitFor } from '@testing-library/react'
import NotFound from '../NotFound'
import { getNotFound } from '../../apis/notFound'

jest.mock('../../apis/notFound')

const notFoundMockData = ['/images/bag-cat.jpg']

jest.spyOn(console, 'error').mockImplementation(() => {})

beforeEach(() => {
  jest.resetAllMocks()
})

describe('<NotFound />', () => {
  it('displays image from api.', async () => {
    getNotFound.mockReturnValue(Promise.resolve(notFoundMockData))
    expect.assertions(1)
    render(<NotFound animal={notFoundMockData} />)
    return waitFor(() => getNotFound.mock.calls.length > 0).then(() => {
      const image = screen.getByRole('img')
      expect(image.src).toContain(notFoundMockData[0])
    })
  })

  it('throws correct error if required api is not provided', async () => {
    getNotFound.mockImplementation(() => Promise.reject(new Error('No Shibe')))
    expect.assertions(1)
    render(<NotFound />)
    return waitFor(() => getNotFound.mock.calls.length > 0).then(() => {
      expect(console.error).toHaveBeenCalledWith('No Shibe')
    })
  })
})
