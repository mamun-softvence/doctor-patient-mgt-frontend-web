import { test as base, expect } from '@playwright/test';

export const test = base.extend<{
  resetStorage: void;
}>({
  resetStorage: [
    async ({ context, page }, use) => {
      // Clear all cookies and storage before each test
      await context.clearCookies();
      await page.addInitScript(() => {
        try {
          window.localStorage.clear();
          window.sessionStorage.clear();
        } catch {
          // ignore in environments where storage might be restricted
        }
      });
      await use();
    },
    { auto: true },
  ],
});

export { expect };
