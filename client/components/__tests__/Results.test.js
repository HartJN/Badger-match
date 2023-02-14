import React from 'react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { screen, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Results from '../Results'
import { fetchResults } from '../../actions/results'
import { useAuth0 } from '@auth0/auth0-react'

const resultContentMockData = [
  {
    id: 1,
    name: 'Penguin',
    imageUrl: '/penguin.png',
    description: `I'm a lovely penguin`,
    disposition: 'friend',
  },
  {
    id: 2,
    name: 'Puppy',
    imageUrl: '/puppy.png',
    description: `I'm a naughty puppy`,
    disposition: 'foe',
  },
  {
    id: 3,
    name: 'Potato',
    imageUrl: '/potato.png',
    description: `I'm a stud I mean spud`,
    disposition: 'friend',
  },
]
jest.mock('@auth0/auth0-react')

jest.mock('../../actions/results')

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
    return { results: resultContentMockData }
  }),
}

describe('<Results />', () => {
  it('displays image, animal name, description and disposition from redux state.', () => {
    expect.assertions(4)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Results />
        </BrowserRouter>
      </Provider>
    )
    const animalName = screen.getAllByText(/penguin/i)
    expect(animalName[0]).toBeInTheDocument()
    const animalDescription = screen.getByText(
      resultContentMockData[1].description,
      {
        exact: false,
      }
    )
    expect(animalDescription).toBeInTheDocument(`I'm a naughty puppy`)
    const animalDisposition = screen.getAllByText(
      resultContentMockData[2].disposition,
      {
        exact: false,
      }
    )
    expect(animalDisposition[4].innerHTML).toContain('FRIEND')

    const image = screen.getAllByRole('img')[0]
    expect(image.src).toMatch('/penguin.png')
  })
  it('dispatches the fetchResults thunk.', () => {
    expect.assertions(1)
    const fetchResultContentMockReturn = () => 'mockReturnFunctionsReturnValue'
    fetchResults.mockReturnValue(fetchResultContentMockReturn)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Results />
        </BrowserRouter>
      </Provider>
    )
    expect(fakeStore.dispatch).toHaveBeenCalledWith(
      fetchResultContentMockReturn
    )
  })
  it('shows the correct number of animals on the page', () => {
    expect.assertions(1)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Results />
        </BrowserRouter>
      </Provider>
    )
    const animalLength = screen.getAllByRole('heading', { level: 2 })
    expect(animalLength).toHaveLength(3)
  })
})
