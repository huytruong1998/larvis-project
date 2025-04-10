import { test, expect } from '@playwright/test';
import login from '../utils';

test.describe('Login function', () => {
  test('should redirect to login page without credential', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/login');
  });

  test('should login with correct user', async ({ page }) => {
    await login(page, 'bob', '1234');
    await expect(page).toHaveTitle('Larvis');
    await expect(page).toHaveURL('/');
    await page.getByTestId('logout-button').click();
  });

  test('should show error with incorrect user', async ({ page }) => {
    await login(page, 'wronguser', 'wronguser');

    const errorMessages = page.locator('.ant-form-item-explain-error');

    await expect(errorMessages).toHaveCount(2);

    await expect(errorMessages.nth(0)).toHaveText('Invalid username and password');
    await expect(errorMessages.nth(1)).toHaveText('Invalid username and password');
  });

  test('should logout user', async ({ page }) => {
    await login(page);
    await expect(page).toHaveTitle('Larvis');
    await expect(page).toHaveURL('/');

    await page.getByTestId('logout-button').click();

    await expect(page).toHaveURL('/login');
  });
});
