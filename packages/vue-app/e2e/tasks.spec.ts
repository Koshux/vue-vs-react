import { test, expect } from '@playwright/test'

test('add -> toggle flow', async ({ page }) => {
  await page.goto('http://localhost:5173/tasks')
  await page.getByPlaceholder('New task...').fill('Playwright Task')
  await page.getByRole('button', { name: 'add' }).click()

  await expect(page.getByText('Playwright Task')).toBeVisible()

  const row = page.getByText('Playwright Task')
    .locator('..')
    .locator('input[type="checkbox"]')
  await row.check()

  await page.getByRole('button', { name: 'done' }).click()
  await expect(page.getByText('Playwright Task')).toBeVisible()
})
