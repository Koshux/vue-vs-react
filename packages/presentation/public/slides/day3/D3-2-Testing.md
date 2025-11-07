## D3.2: Unit Testing

branch: day-3/01-testing

### The Testing Pyramid

A model for a healthy testing strategy. We will focus on the bottom two layers.

![Image of the testing pyramid](../../type-of-tests.jpg 'Types of Tests')

- **Unit Tests (Base)**: Fast, cheap. Test a single function or component in isolation. (We are here.)
- **Integration Tests (Middle)**: Test how multiple components work _together_.
- **E2E Tests (Top)**: Slow, expensive. Test the full application in a real browser.

---

### Vue: `Vitest` + `Vue Test Utils`

- **Vitest**: A modern, Vite-native test runner. It's fast and has a great API.
- **Vue Test Utils**: The official library for mounting Vue components.
- **Pattern**: `mount()` the component, use `wrapper.find()` to get elements, `wrapper.trigger('click')` to interact, and `expect()` to assert.

```js
import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

test('it increments', async () => {
  const wrapper = mount(Counter)
  await wrapper.find('button').trigger('click')
  expect(wrapper.html()).toContain('1')
})
```

---

### React: Vitest + React Testing Library

- React Testing Library (RTL): The industry standard.
- Philosophy: "Test your components the way a user would." You find elements by their text, label, or role, not by class or ID. This makes tests less brittle.
- Pattern: render() the component, use screen.getByText() to find elements, fireEvent.click() to interact, and expect() to assert.

```js
import { render, screen, fireEvent } from '@testing-library/react'
import Counter from './Counter'

test('it increments', () => {
  render(<Counter />)
  fireEvent.click(screen.getByText('Increment'))
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

---

### Your Task

In both apps, write a simple unit test for your Button component:

1. Test that it renders the label prop correctly.
2. Test that the onClick handler (Vue: @click emit) is called when it's clicked.
