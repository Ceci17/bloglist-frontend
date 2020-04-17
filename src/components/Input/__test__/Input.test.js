import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Input from '../Input'

describe('<Input />', () => {
  const setup = () => {
    const component = render(<Input />)
    const input = component.container.querySelector('.input')
    return {
      input,
      ...component
    }
  }

  test('Displays the correct value a', async () => {
    const { input } = setup()

    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: 'Stefan' } })
    expect(input.value).toBe('Stefan')
  })
})
