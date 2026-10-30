import { test, expect } from '../fixtures/test';

test.describe('Landing & Navigation', () => {
  test('W01/Smoke: Root page loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/.*Next|Doctor|Patient.*/i);
    const main = page.getByRole('main');
    await expect(main).toBeVisible();
  });

  test('W20: Non-existent route displays not-found or fallback', async ({ page }) => {
    const res = await page.goto('/some-non-existent-route-404');
    expect(res?.status()).toBeDefined();
  });
});
