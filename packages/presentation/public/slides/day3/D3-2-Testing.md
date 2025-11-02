D3.2: Unit Testing

branch: day-3/01-testing

Goal: Test a single component or function in isolation.

Tools: Jest or Vitest (test runners) + a component testing library.

Vue: Vue Test Utils

The official testing library for Vue.

mount() or shallowMount() a component.

Find elements, interact (.trigger('click')), and assert the results.

import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

test('it increments', async () => {
  const wrapper = mount(Counter)
  await wrapper.find('button').trigger('click')
  expect(wrapper.html()).toContain('1')
})


--

React: React Testing Library (RTL)

The industry standard.

Philosophy: "Test your components the way a user would."

Avoids implementation details. Find elements by text, label, or role, not CSS classes.

import { render, screen, fireEvent } from '@testing-library/react'
import Counter from './Counter'

test('it increments', () => {
  render(<Counter />)
  fireEvent.click(screen.getByText('Increment'))
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})


Your Task

In both apps, write a simple unit test for your Button component.

Test:

That it renders the label prop correctly.

That the click handler is called when it's clicked.
