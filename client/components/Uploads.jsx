/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Uploads.module.scss'
import fetchUploads from '../actions/uploads'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './isAuthenticated'

export default function Uploads() {
  const dispatch = useDispatch()
  const uploads = useSelector((state) => state.uploads)
  const { getAccessTokenSilently } = useAuth0()

  const fetchData = async () => {
    const token = await getAccessTokenSilently()
    dispatch(fetchUploads(token))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <IfAuthenticated>
        <h1 className={styles.heading}>Your Previous Uploads</h1>
        {uploads.map((animal) => {
          return (
            <div key={animal.id} className={styles.uploadsContainer}>
              <div className={styles.containerOne}>
                <img
                  className={styles.image}
                  src={animal.imageUrl}
                  alt={animal.name}
                />
              </div>
              <div className={styles.containerTwo}>
                <p>Hi, my name is {animal.name}</p>
                <p>About me: {animal.description}</p>
              </div>
            </div>
          )
        })}
      </IfAuthenticated>

      <IfNotAuthenticated>
        <h1 className={styles.heading}>
          You must be logged in to view this page
        </h1>
      </IfNotAuthenticated>
    </>
  )
}
