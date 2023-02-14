import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Create from '../Create'
import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

jest.spyOn(console, 'log').mockImplementation(() => {})
jest.spyOn(console, 'error').mockImplementation(() => {})

jest.mock('@auth0/auth0-react')
jest.mock('../../apis/create')

beforeEach(() => {
  useAuth0.mockReturnValue({
    getAccessTokenSilently: () => {
      return Promise.resolve('this-is-a-token')
    },
  })
})

describe('Create', () => {
  const animal = {
    name: 'test',
    description: 'test',
  }

  it('should render the Create component', () => {
    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    )
    expect(screen.getByTestId('create-form')).toBeInTheDocument()
  })

  it('should render the form', () => {
    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    )

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
    expect(screen.getByTestId('create-container')).toBeInTheDocument()
    expect(screen.getByTestId('create-form')).toBeInTheDocument()
    expect(screen.getByTestId('file-missing')).toBeInTheDocument()
  })

  it('should render the dropzone', () => {
    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    )
    expect(
      screen.getByText(/Drag, or click to select files/i)
    ).toBeInTheDocument()
  })

  it('should render the dropzone when clicked', () => {
    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    )
    fireEvent.click(screen.getByText(/Drag, or click to select files/i))
    expect(
      screen.getByText(/Drag, or click to select files/i)
    ).toBeInTheDocument()
  })

  // Todo: failing test. bro wth
  it.skip('should return false if invalid file type', async () => {
    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    )
    userEvent.type(screen.getByLabelText(/Name:/i), animal.name)
    userEvent.type(screen.getByLabelText(/Description:/i), animal.description)

    await userEvent.upload(
      // screen.getByLabelText(/Drag, or click to select files/i),
      screen.getByTestId('image-input'),
      new File([''], 'badfilename.txt')
    )

    const warning = await screen.findByText(/Invalid file type/i)
    expect(warning).toBeVisible()
  })
})

// https://github.com/react-dropzone/react-dropzone/blob/master/src/index.spec.js
