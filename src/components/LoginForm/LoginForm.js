import React from 'react'
import Input from '../Input'

const LoginForm = ({ values, handleChange, handleLogin }) => {
  return (
    <form id="login-form" onSubmit={handleLogin}>
      <Input
        id="username"
        type="text"
        value={values.username}
        name="username"
        onChange={handleChange}
        placeholder="username"
      />
      <Input
        id="password"
        type="password"
        value={values.password}
        name="password"
        onChange={handleChange}
        placeholder="password"
      />
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
