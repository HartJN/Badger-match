import React from 'react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { screen, render, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Final from '../Final'
import { fetchAnimal, addResult } from '../../actions/final'
import { useAuth0 } from '@auth0/auth0-react'

const animalByIdMockData = {
  id: 1,
  auth0_id: '1',
  name: 'Bag Cat',
  description: 'Likes bags',
  imageUrl: '/images/bag-cat.jpg',
}
jest.mock('@auth0/auth0-react')

jest.mock('../../actions/final')

beforeEach(() => {
  useAuth0.mockReturnValue({
    getAccessTokenSilently: () => {
      return Promise.resolve('this-is-a-token')
    },
  })
  jest.clearAllMocks()
})

const fakeStore = {
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: jest.fn(() => {
    return { final: animalByIdMockData }
  }),
}

describe('<Final/>', () => {
  it('dispatch the fetchAnimal thunk', () => {
    expect.assertions(1)
    const fetchAnimalContentMockReturn = () => 'mockReturnFunctionsReturnValue'
    fetchAnimal.mockReturnValue(fetchAnimalContentMockReturn)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Final />
        </BrowserRouter>
      </Provider>
    )
    expect(fakeStore.dispatch).toHaveBeenCalledWith(
      fetchAnimalContentMockReturn
    )
  })
  it('display image and animal name from redux state by ID.', () => {
    expect.assertions(2)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Final />
        </BrowserRouter>
      </Provider>
    )
    const animalName = screen.getByText(animalByIdMockData.name, {
      exact: false,
    })
    expect(animalName).toBeTruthy()
    const image = screen.getByRole('img')
    expect(image.src).toMatch(animalByIdMockData.imageUrl)
  })
  it('dispatch the addResult thunk', () => {
    expect.assertions(1)
    const addResultMockReturn = () => 'mockReturnFunctionsReturnValue'
    addResult.mockReturnValue(addResultMockReturn)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Final />
        </BrowserRouter>
      </Provider>
    )
    const result = screen.getAllByRole('button')[0]
    fireEvent.click(result, { target: { value: 'friend' } })
    expect(fakeStore.dispatch).toHaveBeenCalledWith(addResultMockReturn)
  })
})
