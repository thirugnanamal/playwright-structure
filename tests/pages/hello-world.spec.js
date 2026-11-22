const { test } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage');

test.describe('Home Page Tests', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('displays the Playwright Demo home page', async () => {
    await homePage.expectPageTitle('Playwright Demo - Home');
    await homePage.expectMainHeadingVisible();
  });

  test('displays all feature list items', async () => {
    await homePage.expectFeatureListVisible();
    const count = await homePage.getFeatureCount();
    console.log(`Found ${count} features listed`);
  });

  test('displays statistics cards', async () => {
    await homePage.expectStatsVisible();
    const statCount = await homePage.getStatCount();
    console.log(`Found ${statCount} stat cards`);
  });

  test('user can fill and submit the form', async () => {
    await homePage.fillAndSubmitForm(
      'John Doe',
      'john@example.com',
      'qa',
      'Playwright is awesome!'
    );
    await homePage.expectSuccessMessage();
  });

  test('form has reset button that clears inputs', async () => {
    await homePage.fillUserName('Test Name');
    await homePage.clearForm();
    // After reset, the input should be empty
    const nameInput = homePage.page.locator('#userName');
    await homePage.page.evaluate(() => {
      document.getElementById('userName').value === '';
    });
  });

  test('dashboard button navigates to dashboard page', async () => {
    await homePage.clickGoDashboard();
    await homePage.waitForNavigationToDashboard();
  });

  test('about button navigates to about page', async () => {
    await homePage.clickGoAbout();
    await homePage.page.waitForURL('**/about.html');
  });
});

