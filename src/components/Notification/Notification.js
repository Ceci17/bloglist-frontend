import React from 'react'

const Notification = ({ message: { error, success } }) => {
  return (
    <>
      {error || success ? (
        <div className="toast">
          <p className={error ? 'error' : 'success'}>
            {error ? error : success}
          </p>
        </div>
      ) : null}
    </>
  )
}

export default Notification
