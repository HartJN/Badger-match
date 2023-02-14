import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import Navbar from '../Navbar'
import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import '@testing-library/jest-dom'

jest.mock('@auth0/auth0-react')
const fakeLogin = jest.fn()

beforeEach(() => {
  useAuth0.mockReturnValue({
    isAuthenticated: false,
    loginWithRedirect: fakeLogin,
  })
  fakeLogin.mockClear()
})

describe('<Navbar />', () => {
  it('displays Register | Login when the user is signed out', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    )
    const navbar = screen.getByText(/Login/i)
    expect(navbar).toHaveTextContent('Register | Login')
  })
  it('Allows a user to log in', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    )
    const link = screen.getByText('Register | Login')
    fireEvent.click(link)
    expect(fakeLogin).toHaveBeenCalled()
  })
})
