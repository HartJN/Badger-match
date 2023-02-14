import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import { IfAuthenticated, IfNotAuthenticated } from './isAuthenticated'

import { useAuth0 } from '@auth0/auth0-react'

export default function Navbar() {
  const { logout, loginWithRedirect, user } = useAuth0()

  const handleLogOff = (e) => {
    e.preventDefault()

    logout()
  }

  const handleSignIn = (e) => {
    e.preventDefault()

    loginWithRedirect()
  }

  return (
    <nav className={styles.navbar}>
      <Link to='/'>
        <div className={styles.title}>Badger Match</div>
      </Link>
      <div className={styles.links}>
        <IfAuthenticated>
          <Link to='/play'>Play</Link>
          <Link to='/create'>Create</Link>
          <Link to='/results'>Results</Link>
          <Link to='/uploads'>Uploads</Link>
          <div className={styles.auth}>
            <div>Hello {user?.nickname}</div>
            <div>
              <Link to='/' onClick={handleLogOff}>
                Sign out
              </Link>
            </div>
          </div>
        </IfAuthenticated>

        <IfNotAuthenticated>
          <Link className={styles.auth} to='/' onClick={handleSignIn}>
            Register | Login
          </Link>
        </IfNotAuthenticated>
      </div>
    </nav>
  )
}
