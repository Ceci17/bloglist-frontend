import React from 'react'

const Input = (props) => {
  const { label, name } = props
  return (
    <div className="field">
      {label && <label htmlFor={name}>{label}: </label>}
      <input
        {...props}
        style={{
          padding: 5,
          marginBottom: 10,
          fontSize: 12,
          minWidth: 200
        }}
      />
    </div>
  )
}

export default Input
