import { test, expect } from '@playwright/test'

test.describe('React Task Tracker', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear()
    })
  })

  test('can load home and navigate to tasks', async ({ page }) => {
    // go to root
    await page.goto('/')

    // assert something from your Home page
    await expect(page.getByText(/home|welcome|react/i)).toBeVisible()

    // if you have a nav link to Tasks:
    const tasksLink = page.getByRole('link', { name: /tasks/i })
    await tasksLink.click()

    // now assert tasks page
    await expect(page.getByText(/task tracker/i)).toBeVisible()
  })

  test('can add a task', async ({ page }) => {
    await page.goto('/tasks')

    // type in the input
    await page.getByTestId('task-input').fill('Prepare demo')
    // submit – pick ONE of these:
    // A) click the real button
    await page.getByRole('button', { name: /add/i }).click()
    // B) or: await page.getByTestId('task-input').press('Enter')
    await expect(page.getByTestId('task-list')).toContainText('Prepare demo')

    const input = page.getByPlaceholder(/new task/i)
    await input.fill('Write slides')
    await page.getByRole('button', { name: /add/i }).click()

    // check it rendered
    await expect(page.getByText('Write slides')).toBeVisible()
  })

  test('can add a task - localstorage', async ({ page }) => {
    await page.goto('/tasks')

    await page.getByPlaceholder(/new task/i).fill('Write slides')
    await page.getByRole('button', { name: /add/i }).click()

    await expect(page.getByText('Write slides')).toBeVisible()
  })

})
