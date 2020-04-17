import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Like } from '../components'

describe('<Like />', () => {
  test(`Like is called two times`, () => {
    const mockHandler = jest.fn()
    const user = {
      name: 'User',
      username: 'username'
    }

    const component = render(
      <Like handleLike={mockHandler} user={user} likes={0} />
    )

    fireEvent.click(component.getByText('like'))
    fireEvent.click(component.getByText('like'))

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
