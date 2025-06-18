import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('SynBioHub Setup Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the SynBioHub homepage before each test
    await page.goto('http://localhost:3333/');
  });

  test('default setup', async ({ page }) => {

    // Check we are on the setup page
    // await expect(page).toHaveURL('http://localhost:3333/setup');
    // Verify the presence of the setup prompt
    await expect(page.getByText('We just need a few more details to configure your SynBioHub instance')).toBeVisible();

    // Theme Creation
    // Add instance name
    await page.getByRole('textbox', { name: 'My SynBioHub' }).fill('Test Instance');

    // Add welcome message
    await page.getByRole('textbox', { name: 'Write welcome message here...' }).fill('Welcome to the Test Instance of SynBioHub!');

    // Add a logo
    const logoPath = path.join(__dirname, 'assets/synbiohub-logo.png');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Choose File' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(logoPath);

    // Set a hex color
    await page.getByRole('textbox', { name: 'hex' }).fill('#FF5733');


    // User creation
    // Set username
    await page.locator('input[name="username"]').fill('testuser');

    // Set full name
    await page.locator('input[name="full name"]').fill('Test User');

    // Set password
    await page.locator('input[name="password"]').fill('testpassword');
    await page.locator('input[name="password (again)"]').fill('testpassword');

    // Set user email
    await page.locator('input[name="email"]').fill('testuser@example.com');

    // Click the submit button
    await page.getByText('Create My SynBioHub!').click();

    // Wait for the main page to load
    await expect(page.locator('span.instanceName')).toHaveText('Test Instance');
  });
});