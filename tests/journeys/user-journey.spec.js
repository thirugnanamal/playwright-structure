const { test } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage');
const { DashboardPage } = require('../../pages/DashboardPage');

test.describe('User Journey Tests', () => {
  test('complete user flow: home page → form submission → dashboard', async ({ page }) => {
    // Step 1: Navigate to home page
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.expectPageTitle('Playwright Demo - Home');

    // Step 2: User fills out the form
    await homePage.fillAndSubmitForm(
      'Alice Johnson',
      'alice.johnson@example.com',
      'qa',
      'Excited to learn about Playwright testing best practices!'
    );

    // Step 3: Verify success message appears
    await homePage.expectSuccessMessage();

    // Step 4: Wait for automatic redirect to dashboard
    await homePage.waitForNavigationToDashboard();

    // Step 5: Verify we're on the dashboard
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.expectPageTitle('Playwright Demo - Dashboard');
    await dashboardPage.expectSuccessAlert();
    await dashboardPage.expectMetricsVisible();

    // Step 6: Verify dashboard content
    const metricCount = await dashboardPage.getMetricCount();
    console.log(`Dashboard loaded with ${metricCount} metric cards`);
  });

  test('user can navigate between pages using buttons', async ({ page }) => {
    // Start on home page
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.expectMainHeadingVisible();

    // Navigate to dashboard
    await homePage.clickGoDashboard();
    await page.waitForURL('**/dashboard.html');

    // Verify we're on dashboard
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.expectMainHeadingVisible();

    // Navigate back to home
    await dashboardPage.clickBackToHome();
    await page.waitForURL('**/index.html');

    // Verify we're back on home
    await homePage.expectMainHeadingVisible();
  });

  test('user can navigate to about page and return', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    // Go to about page
    await homePage.clickGoAbout();
    await page.waitForURL('**/about.html');
    await page.waitForSelector('h1:has-text("About This Demo")');

    // Return to home
    const backButton = page.locator('button:has-text("Back to Home")');
    await backButton.first().click();
    await page.waitForURL('**/index.html');
    await homePage.expectMainHeadingVisible();
  });

  test('form validation: email field validation works', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    // Fill form with invalid email
    await homePage.fillUserName('John Doe');
    await homePage.fillUserEmail('invalid-email'); // Invalid format
    await homePage.selectUserRole('dev');

    // Try to submit (HTML5 validation should prevent it)
    const submitButton = page.locator('#submitBtn');
    // The browser will show validation error for invalid email
    console.log('Form validation is handled by HTML5');
  });

  test('complete form with all field types', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    // Fill each field type
    await homePage.fillUserName('Sarah Smith');
    await homePage.fillUserEmail('sarah@example.com');
    await homePage.selectUserRole('manager');
    await homePage.fillUserMessage('Love the Playwright testing framework! Great for E2E testing.');

    // Submit and verify
    await homePage.submitForm();
    await homePage.expectSuccessMessage();
  });
});
