import { test, expect, Page } from '@playwright/test';
import login from '../utils';

async function updateUser(page: Page, name: string, password: string) {
  await page.getByTestId('my-profile-button').click();
  const editModal = page.locator('.ant-modal-body');
  await expect(editModal).toBeVisible();

  await editModal.getByRole('button', { name: /Edit/i }).click();

  const userNameInput = await editModal.locator('#name');
  await userNameInput.fill(name);

  const passwordInput = await editModal.locator('#password');
  await passwordInput.fill(password);

  await editModal.getByRole('button', { name: /Update/i }).click();
  await page.locator('.ant-modal-close-x').click();
}

test.describe('Edit User', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'bob', '1234');
    await expect(page).toHaveURL('/');
    await updateUser(page, 'bob new', 'random');
    await page.getByTestId('logout-button').click();
  });

  test.afterEach(async ({ page }) => {
    await login(page, 'bob', 'random');
    await expect(page).toHaveURL('/');
    await updateUser(page, 'bob', '1234');
    await page.getByTestId('logout-button').click();
  });

  test('should show error using old password', async ({ page }) => {
    await page.goto('/login');
    await login(page, 'bob', '1234');
    const errorMessages = page.locator('.ant-form-item-explain-error');

    await expect(errorMessages).toHaveCount(2);

    await expect(errorMessages.nth(0)).toHaveText('Invalid username and password');
    await expect(errorMessages.nth(1)).toHaveText('Invalid username and password');
  });

  test('should login with new password', async ({ page }) => {
    await page.goto('/login');
    await login(page, 'bob', 'random');
    await expect(page).toHaveTitle('Larvis');
    await expect(page).toHaveURL('/');
    await page.getByTestId('logout-button').click();
  });
});
