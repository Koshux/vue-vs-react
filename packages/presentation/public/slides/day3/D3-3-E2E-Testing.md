## D3.3: End-to-End (E2E) Testing (Time: 60 mins)

branch: day-3/02-e2e-testing

### What is E2E Testing?

E2E tests simulate a _real user's entire journey_ through your application in a _real browser_.

**Example Flow**:

1.  Launch Chrome.
2.  Visit `localhost:5173`.
3.  Click the "Login" link.
4.  Fill in the "email" and "password" fields.
5.  Click "Submit".
6.  Assert that the URL is now `/dashboard`.

---

### Cypress vs. Playwright

- **Cypress**: The classic E2E tool. Runs _inside_ the browser, which gives it a great time-traveling debugger.
- **Playwright**: The modern successor from Microsoft. Runs _outside_ the browser, giving it more control. It's known for being extremely fast, reliable, and having excellent cross-browser support (Chrome, Firefox, Safari) with one API.

We are using **Playwright**.

---

### Playwright Example

Tests are written in a simple `test('name', ...)` format.

```js
import { test, expect } from '@playwright/test'

test('counter page works', async ({ page }) => {
  // 1. Visit the page
  await page.goto('http://localhost:5173/')

  // 2. Find elements and interact
  await page.click('text=Increment')

  // 3. Assert the result
  const count = await page.locator('.count-display')
  await expect(count).toHaveText('1')
})
```

---

### Your Task

Choose one app (Vue or React):

1. Add Playwright to the project.
2. Write one E2E test that:
   - Visits the home page (/).
   - Clicks the link to the /about page.
   - Asserts that the /about page shows the Pokémon's name ("pikachu").
