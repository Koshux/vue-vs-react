D3.3: E2E Testing

branch: day-3/02-e2e-testing

Goal: Test the entire application flow from a real user's perspective in a real browser.

Tools: Cypress (the classic), Playwright (the modern, fast successor).

Cypress vs. Playwright

Cypress:

Runs inside the browser.

Great "time-travel" debugger.

Traditionally only supported Chrome-based browsers (now supports more).

Playwright:

Runs outside the browser (like Puppeteer).

Controls Chrome, Firefox, and WebKit (Safari) with one API.

Extremely fast and reliable, with powerful auto-waits.

--

Example (Playwright)

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


Your Task

Choose one app (Vue or React):

Add Playwright to the project.

Write one E2E test that:

Visits the home page.

Clicks the link to the /about page.

Asserts that the /about page shows the Pokémon's name you fetched earlier.
