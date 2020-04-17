import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef(
  ({ openLabel = 'open', closeLabel = 'close', children }, ref) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
      setVisible((currentVisibility) => !currentVisibility)
    }

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility
      }
    })

    return (
      <div>
        {!visible ? (
          <>
            <button onClick={toggleVisibility}>{openLabel}</button>
          </>
        ) : (
          <>
            {children}
            <button onClick={toggleVisibility}>{closeLabel}</button>
          </>
        )}
      </div>
    )
  }
)

Togglable.displayName = 'Togglable'

export default Togglable
