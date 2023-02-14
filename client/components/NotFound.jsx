import React, { useState, useEffect } from 'react'
import { getNotFound } from '../apis/notFound'
import styles from './NotFound.module.scss'

export default function NotFound() {
  const [funImage, setFunImage] = useState(null)

  useEffect(() => {
    getNotFound()
      .then((shibeImage) => {
        setFunImage(shibeImage[0])
      })
      .catch((e) => {
        console.error(e.message)
      })
  }, [])

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading} {...styles.text}>
          404 NOT FOUND...HAVE A SHIBE
        </h1>
        {funImage && (
          <img className={styles.image} src={funImage} alt='404image' />
        )}
      </div>
    </>
  )
}
