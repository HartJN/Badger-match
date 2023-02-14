import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { screen, render, waitFor } from '@testing-library/react'
import Play from '../Play'
import { useNavigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../store'
import { getAnimals } from '../../apis/play'
import { useAuth0 } from '@auth0/auth0-react'

const playAnimalsMockData = [
  {
    id: 1,
    uploaderId: 'mockID',
    name: 'mockName',
    description: 'mockCaptionText',
    imageUrl: 'mockImageUrl',
  },
  {
    id: 2,
    uploaderId: 'mockID',
    name: 'mockName',
    description: 'mockCaptionText',
    imageUrl: 'mockImageUrl',
  },
  {
    id: 3,
    uploaderId: 'mockID',
    name: 'mockName',
    description: 'mockCaptionText',
    imageUrl: 'mockImageUrl',
  },
]

jest.mock('@auth0/auth0-react')

beforeEach(() => {
  useAuth0.mockReturnValue({
    getAccessTokenSilently: () => {
      return Promise.resolve('this-is-a-token')
    },
  })
  jest.resetAllMocks()
})

jest.mock('react-router-dom')
jest.mock('../../apis/play')

describe('<Play />', () => {
  it('displays two random animals images from api call', () => {
    expect.assertions(2)
    getAnimals.mockReturnValue(Promise.resolve(playAnimalsMockData))
    render(
      <Provider store={store}>
        <Play />
      </Provider>
    )
    return waitFor(() => getAnimals.mock.calls.length > 0).then(() => {
      const animalName = screen.getAllByTestId('animalTile')
      expect(animalName).toHaveLength(2)
      const buttons = screen.getAllByRole('button')
      // Tiles count as buttons due to its component design
      expect(buttons).toHaveLength(5)
    })
  })
  it('Navigates to Final page', async () => {
    expect.assertions(1)
    useNavigate.mockImplementation(() => {})
    getAnimals.mockReturnValue(Promise.resolve(playAnimalsMockData))
    render(
      <Provider store={store}>
        <Play />
      </Provider>
    )
    return waitFor(() => getAnimals.mock.calls.length > 0).then(() => {
      userEvent.click(screen.getAllByRole('button')[0])
      expect(useNavigate).toHaveBeenCalled()
    })
  })
})
