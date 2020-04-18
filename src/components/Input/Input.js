import React from 'react'

const Input = (props) => {
  const { label, name } = props
  return (
    <>
      {label && <label htmlFor={name}>{label}: </label>}
      <input
        className="input"
        {...props}
        style={{
          padding: 5,
          marginBottom: 10,
          fontSize: 12
        }}
      />
    </>
  )
}

export default Input
