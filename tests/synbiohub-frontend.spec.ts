import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('SynBioHub Setup Tests', () => {
  test('Setup SynBioHub Instance', async ({ page }) => {
    // Navigate to the setup page
    await page.goto('/');

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

  test.describe('Account Management Tests', () => {
    test('Admin can login with setup credentials', async ({ page }) => {
      // Navigate to the login page
      await page.goto('/login');
      // Fill in the login form
      await page.getByRole('textbox', { name: 'Username or Email' }).fill('testuser');
      await page.getByRole('textbox', { name: 'Password' }).fill('testpassword');
      // Submit the form
      await page.getByRole('button', { name: 'Sign in' }).click();

      // Wait for the main page to load 1 second
      await page.waitForTimeout(1000);

      // Verify successful login by checking for username in the header
      // Open user menu
      await page.locator('div[class*="navbar_profilecontainer"]').click();

      // Get the signed in user info
      await expect(page.locator('div[class*="navbar_userinfo"]')).toContainText('testuser');


      // Admin can change settings



      
      // Admin can logout
      // Navigate to the homepage
      await page.goto('/');
      // Click the logout button
      await page.getByRole('button', { name: 'Logout' }).click();
      // Verify we are back on the login page
      await expect(page).toHaveURL('http://localhost:3333/login');
    });

    // test('User can create account', async ({ page }) => {
    //   // Navigate to the login page
    //   await page.goto('http://localhost:3333/register');

    //   // Fill in the login form
    //   await page.locator('input[name="username"]').fill('testuser');
    //   await page.locator('input[name="full name"]').fill('Test User');
    //   await page.locator('input[name="password"]').fill('testpassword');
    //   await page.locator('input[name="password (again)"]').fill('testpassword');
    //   await page.locator('input[name="email"]').fill('testuser@example.com');


    //   // Submit the form
    //   await page.getByRole('button', { name: 'Create Account' }).click();

    //   // Verify successful login by checking for the instance name
    //   await expect(page.locator('span.instanceName')).toHaveText('Test Instance');
    // });

    // test('User can log out', async ({ page }) => {
    //   // Ensure user is logged in first
    //   await page.goto('http://localhost:3333/');
    //   await expect(page.locator('span.instanceName')).toHaveText('Test Instance');

    //   // Click the logout button
    //   await page.getByRole('button', { name: 'Logout' }).click();

    //   // Verify we are back on the homepage
    //   await expect(page).toHaveURL('http://localhost:3333/');
    // });
  }
  );
});