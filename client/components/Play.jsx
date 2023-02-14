import React, { useEffect, useState } from 'react'
import { getAnimals } from '../apis/play'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AnimalTile from './AnimalTile'
import '../styles/index.scss'
import { updateAnimals } from '../actions/play'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './isAuthenticated'

export default function Play() {
  const [animalsToRate, setAnimals] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { getAccessTokenSilently } = useAuth0()

  const fetchData = async () => {
    const token = await getAccessTokenSilently()
    getAnimals(token)
      .then((animalsToRate) => {
        setAnimals(animalsToRate)
        if (animalsToRate.length < 2) {
          addAnimalToRedux(animalsToRate)
        }
        setAnimals(randomToRate(animalsToRate))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  function randomToRate(animalsToRate) {
    let indexLength = animalsToRate.length
    let num1 = Math.floor(Math.random() * indexLength)
    let num2 = 0
    // The while loop will only run if the two values are the same
    do {
      num2 = Math.floor(Math.random() * indexLength)
    } while (num1 === num2)
    return [animalsToRate[num1], animalsToRate[num2]]
  }

  function addAnimalToRedux(animal) {
    dispatch(updateAnimals(animal))
    navigate(`/play/final/${animal.id}`)
  }

  return (
    <>
      <IfAuthenticated>
        <h1>Pick something chump</h1>
        <div className='animalCards'>
          {animalsToRate.map((animal) => {
            return (
              <div
                key={animal.id}
                className='animalTileWithButton'
                data-testid='animalTile'
              >
                <AnimalTile animal={animal} />
                <div className='pickButtonContainer'>
                  <button
                    className='pickButton'
                    onClick={() => addAnimalToRedux(animal)}
                  >
                    Pick Me
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        <div className='animalCards'>
          <button className='refreshButton' onClick={() => fetchData()}>
            Refresh Choices
          </button>
        </div>
      </IfAuthenticated>

      <IfNotAuthenticated>
        <h1>Please log in to play</h1>
      </IfNotAuthenticated>
    </>
  )
}
