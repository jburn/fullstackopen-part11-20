import { test, expect } from '@playwright/test'

test('phonebook opens', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await expect(page.getByText('Phonebook')).toBeVisible()
})
