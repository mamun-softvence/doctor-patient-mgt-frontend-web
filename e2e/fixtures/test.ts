import { test as base, expect } from '@playwright/test';

export const test = base.extend<{
  resetStorage: void;
}>({
  resetStorage: [
    async ({ context }, use) => {
      // Clear all cookies before each test
      await context.clearCookies();
      await use();
    },
    { auto: true },
  ],
});

export { expect };
