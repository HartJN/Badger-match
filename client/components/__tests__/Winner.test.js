import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import Winner from '../Winner'
import { BrowserRouter } from 'react-router-dom'

const winningAnimal = {
  id: 1,
  auth0_id: '1',
  name: 'Bag Cat',
  description: 'Likes bags',
  imageUrl: '/images/bag-cat.jpg',
  disposition: 'friend',
}

const fakeStore = {
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: jest.fn(() => {
    return { final: winningAnimal }
  }),
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('<Winner/>', () => {
  it('display animal image, name, disposition', () => {
    expect.assertions(3)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Winner />
        </BrowserRouter>
      </Provider>
    )
    const animalName = screen.getByText(winningAnimal.name, { exact: false })
    expect(animalName).toBeTruthy()
    const image = screen.getByRole('img')
    expect(image.src).toMatch(winningAnimal.imageUrl)
    const disposition = screen.getByRole('heading')
    expect(disposition.textContent).toBe("You've made a new friend!")
  })
})
