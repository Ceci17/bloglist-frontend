import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  test('blogs are not rendered when user is not logged in', () => {
    const { container } = render(<App />)

    expect(container.querySelector('.blog-list')).toBeNull()
  })

  test('blogs are rendered when user is logged in', async () => {
    const user = {
      username: 'john_doe',
      token: 'cxwetwe242ew.s22fsp22',
      name: 'John Doe'
    }

    await localStorage.setItem('loggedUser', JSON.stringify(user))

    const { container } = render(<App />)

    expect(container.querySelector('.blog-list')).toBeDefined()

    expect(container.querySelector('.logged')).toHaveTextContent(
      'John Doe logged in'
    )

    expect(container.querySelector('#login-form')).toBeNull()
  })
})
