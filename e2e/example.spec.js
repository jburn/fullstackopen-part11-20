import { test, expect } from '@playwright/test'

test('phonebook opens', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Phonebook')).toBeVisible()
  await expect(page.getByTestId('deleteButton').first()).toBeVisible()
})
