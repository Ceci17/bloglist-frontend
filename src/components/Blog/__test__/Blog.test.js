import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../Blog'

describe('<Blog />', () => {
  let blog
  let user
  beforeEach(async () => {
    blog = {
      title: 'Something',
      author: 'Somebody',
      likes: 42,
      url: 'www.website.com',
      user: {
        name: 'John Doe',
        username: 'john_doe'
      }
    }

    user = {
      username: 'john_doe',
      token: 'cxwetwe242ew.s22fsp22',
      name: 'John Doe'
    }
  })

  test('renders content', () => {
    const { getByText, container } = render(
      <Blog blog={blog} user={user} />
    )

    expect(getByText('Something')).toBeDefined()

    expect(getByText('Somebody')).toBeDefined()

    expect(container.querySelector('.blog-url')).toBeNull()

    expect(container.querySelector('.blog-likes')).toBeNull()
  })

  test(`blog's url and number of likes are shown when the view button has been clicked`, () => {
    const { getByText } = render(<Blog blog={blog} user={user} />)

    fireEvent.click(getByText('view'))

    expect(getByText('www.website.com')).toBeDefined()

    expect(getByText('42 likes')).toBeDefined()
  })
})
