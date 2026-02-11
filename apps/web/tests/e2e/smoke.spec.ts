import { test, expect } from '@playwright/test'

test.describe('Smoke tests', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('AtlasPress X')
  })

  test('protected route redirects to login', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/login/)
  })

  test('login page loads', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('h2')).toContainText('Sign in to AtlasPress X')
    await expect(page.locator('button')).toContainText('Sign in with GitHub')
  })
})
