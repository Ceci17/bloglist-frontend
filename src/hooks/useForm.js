import { useState } from 'react'

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState)

  const handleChange = (event) => {
    event.persist()
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value
    }))
  }

  return {
    handleChange,
    values,
    setValues
  }
}

export default useForm
