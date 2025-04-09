import { Page } from '@playwright/test';

export default async function login(
  page: Page,
  username: string = 'alice',
  password: string = '1234',
) {
  await page.goto('http://localhost:3000/login');

  await page.getByTestId('user-id-input').waitFor();

  await page.getByTestId('user-id-input').fill(username);
  await page.getByTestId('password-input').fill(password);
  await page.getByTestId('login-button').click();
}
