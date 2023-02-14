import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useDropzone } from 'react-dropzone'
import { create, getS3Url } from '../apis/create'
import { IfAuthenticated, IfNotAuthenticated } from './isAuthenticated'
import styles from './Create.module.scss'

const Create = () => {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  const [animal, setAnimal] = useState({
    name: '',
    description: '',
  })

  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const validateFields = (animal, file) => {
    if (!animal.name || !animal.description || !file) {
      setError('Please fill out all fields')

      return false
    }

    const validExtensions = ['jpg', 'jpeg', 'png', 'webp']
    const fileExtension = file.name.split('.').at(-1) // test

    if (!validExtensions.includes(fileExtension)) {
      setError('Invalid file type, please upload a jpg, jpeg, png or webp file')

      return false
    }
    return true
  }

  const handleApi = async () => {
    const token = await getAccessTokenSilently()

    const { uploadUrl } = await getS3Url(file, token)
    const imageUrl = uploadUrl.split('?')[0]
    const newAnimal = { ...animal, imageUrl }

    await create(newAnimal, token)

    setLoading(false)
    setSuccess(true)
    setAnimal({ name: '', description: '' })
    setFile(null)
  }

  const handleChange = (e) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value })
  }

  const handleFileChange = async (acceptedFiles) => {
    setFile(acceptedFiles[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formIsValid = validateFields(animal, file)

    if (formIsValid) {
      setLoading(true)
      await handleApi()
      navigate('/uploads')
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
    },
    multiple: false,
    role: 'input',
  })

  return (
    <div className={styles.container} data-testid='create-container'>
      <IfAuthenticated>
        <h1 className={styles.h1}>Add an Animal</h1>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
          data-testid='create-form'
        >
          <label htmlFor='name' className={styles.label}>
            Name:
          </label>
          <input
            type='text'
            name='name'
            value={animal.name}
            onChange={handleChange}
            className={styles.input}
            aria-label='Name:'
            data-testid='name-input'
          />
          <label htmlFor='description' className={styles.label}>
            Description:
          </label>
          <input
            type='text'
            name='description'
            value={animal.description}
            onChange={handleChange}
            className={styles.input}
            aria-label='Description:'
            data-testid='description-input'
          />
          <div {...getRootProps()} data-testid='dropzone'>
            <input {...getInputProps()} data-testid='image-input' />
            {file ? (
              <p className={styles.dropZone} data-testid='file-present'>
                {file.name}
              </p>
            ) : (
              <p className={styles.dropZone} data-testid='file-missing'>
                Drag, or click to select files
              </p>
            )}
          </div>
          <button
            type='submit'
            className={styles.button}
            data-testid='submit-button'
          >
            Submit
          </button>
        </form>
        {loading && <p data-testid='loading'>Loading...</p>}
        {success && <p data-testid='success'>Success!</p>}
        {error && <p data-testid='error'>{error}</p>}
      </IfAuthenticated>

      <IfNotAuthenticated>
        <h1 className={styles.h1}>Please log in to add an animal</h1>
      </IfNotAuthenticated>
    </div>
  )
}

export default Create
