import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../BlogForm'

describe('<BlogForm />', () => {
  const values = {
    title: 'Title',
    author: 'Author',
    url: 'Url'
  }

  let emit

  beforeAll(() => ({ emit } = window._virtualConsole))

  beforeEach(() => {
    window._virtualConsole.emit = jest.fn()
  })

  afterAll(() => {
    window._virtualConsole.emit = emit
  })

  test('Is called on submit', () => {
    const handleSubmit = jest.fn()
    const handleChange = jest.fn()

    const { container, getByText } = render(
      <BlogForm
        handleBlogSubmit={handleSubmit}
        handleBlogChange={handleChange}
        values={values}
      />
    )

    fireEvent.click(getByText('add'))

    expect(handleSubmit).toHaveBeenCalledTimes(1)

    expect(container.querySelector('#title').value).toBe('Title')
    expect(container.querySelector('#author').value).toBe('Author')
    expect(container.querySelector('#url').value).toBe('Url')
  })
})
