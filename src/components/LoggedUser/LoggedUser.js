import React from 'react'

const LoggedUser = ({ name, logout }) => {
  return (
    <div className="logged-user" style={{ marginBottom: 20 }}>
      <span className="logged-name">{name} logged in</span>
      <button type="submit" onClick={logout}>
        logout
      </button>
    </div>
  )
}

export default LoggedUser
