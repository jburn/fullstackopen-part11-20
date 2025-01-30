import { test, expect } from '@playwright/test'

test('phonebook opens', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Phonebook')).toBeVisible()
})
