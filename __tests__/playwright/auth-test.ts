import { test, expect } from '@playwright/test';

export const authTest = {
  both(url: string) {
    test('if not sign-in, "로그인" link is visible', async ({ page }) => {
      await page.goto(url);
      await page.getByRole('link', { name: '로그인' }).click();
      await expect(page).toHaveURL(
        `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/users/sign-in`
      );
    });

    test('if sign-in, "user dropdown" button is visible', async ({
      page,
      context,
    }) => {
      await context.addCookies([
        {
          name: 'authorization',
          value: '두리',
          url: process.env.NEXT_PUBLIC_WEB_BASE_URL,
        },
      ]);

      await page.goto(url);

      await page.getByRole('button', { name: 'user-dropdown-menu' }).click();
    });
  },

  private(url: string) {
    test('if not sign-in, redirect to sign-in page', async ({ page }) => {
      await page.goto(url);
      await expect(page).toHaveURL(
        `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/users/sign-in`
      );
    });

    test('if sign-in, "user dropdown" button is visible', async ({
      page,
      context,
    }) => {
      await context.addCookies([
        {
          name: 'authorization',
          value: '두리',
          url: process.env.NEXT_PUBLIC_WEB_BASE_URL,
        },
      ]);

      await page.goto(url);

      await page.getByRole('button', { name: 'user-dropdown-menu' }).click();
    });
  },
};
