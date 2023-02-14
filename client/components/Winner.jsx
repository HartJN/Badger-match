import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AnimalTile from './AnimalTile'
import styles from './Winner.module.scss'

export default function Winner() {
  const winningAnimal = useSelector((state) => state.final)

  return (
    <>
      <h2 className={styles.heading}>
        You&apos;ve made a new{' '}
        <span className={styles.disposition}>{winningAnimal.disposition}</span>!
      </h2>
      <div className={styles.container}>
        <AnimalTile animal={winningAnimal} />
        <Link to='/play'>
          <button className={styles.button}>Find another companion</button>
        </Link>
      </div>
    </>
  )
}
