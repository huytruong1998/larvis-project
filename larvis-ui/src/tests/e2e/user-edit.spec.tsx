import { test } from '@playwright/test';
import login from '../utils';

test.describe('Edit User', () => {
  test('should be able to edit user with My Profile', async ({ page }) => {
    await login(page, 'bob', '1234');
  });
});
