import React from 'react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { screen, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Uploads from '../Uploads'
import fetchUploads from '../../actions/uploads'
import { homeContentMockData } from '../../../test/fake-data'
import { useAuth0 } from '@auth0/auth0-react'

jest.mock('@auth0/auth0-react')

jest.mock('../../actions/uploads')

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
    return { uploads: homeContentMockData }
  }),
}

describe('<Uploads />', () => {
  it('displays animal name, about me and imageUrl from redux state.', () => {
    expect.assertions(3)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Uploads />
        </BrowserRouter>
      </Provider>
    )
    const animalName = screen.getAllByText(/Bag Cat/i)
    expect(animalName[0]).toBeInTheDocument()

    const animalDescription = screen.getByText(
      homeContentMockData[1].description,
      {
        exact: false,
      }
    )
    expect(animalDescription.innerHTML).toContain(`Lives in mugs`)

    const image = screen.getAllByRole('img')[0]
    expect(image.src).toMatch('/images/bag-cat.jpg')
  })
  // This won't work until the back end is wired up
  it('dispatches the fetchUploads thunk.', () => {
    expect.assertions(1)
    const fetchUploadContentMockReturn = () => 'mockReturnFunctionsReturnValue'
    fetchUploads.mockReturnValue(fetchUploadContentMockReturn)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Uploads />
        </BrowserRouter>
      </Provider>
    )
    expect(fakeStore.dispatch).toHaveBeenCalledWith(
      fetchUploadContentMockReturn
    )
  })
  it('check amount of uploads matches', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Uploads />
        </BrowserRouter>
      </Provider>
    )
    const listUpdates = screen.getAllByRole('img')
    expect(listUpdates).toHaveLength(4)
  })
})
