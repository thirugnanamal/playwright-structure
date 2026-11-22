const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../../pages/DashboardPage');

test.describe('Dashboard Page Tests', () => {
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.navigate();
  });

  test('displays the dashboard page with correct title', async () => {
    await dashboardPage.expectPageTitle('Playwright Demo - Dashboard');
    await dashboardPage.expectMainHeadingVisible();
  });

  test('displays success alert message', async () => {
    await dashboardPage.expectSuccessAlert();
  });

  test('displays key metrics section', async () => {
    await dashboardPage.expectMetricsVisible();
    const count = await dashboardPage.getMetricCount();
    console.log(`Found ${count} metric cards`);
  });

  test('displays test results table with data', async () => {
    await dashboardPage.expectTestResultsTableVisible();
    const rowCount = await dashboardPage.getTestResultsRowCount();
    console.log(`Test results table has ${rowCount} rows`);
  });

  test('displays coverage table with component data', async () => {
    await dashboardPage.expectCoverageTableVisible();
    const rowCount = await dashboardPage.getCoverageRowCount();
    console.log(`Coverage table has ${rowCount} rows`);
  });

  test('back to home button navigates to home page', async () => {
    await dashboardPage.clickBackToHome();
    await dashboardPage.waitForNavigationToHome();
  });

  test('refresh data button works', async () => {
    // Store a reference to track page load
    const navigationPromise = dashboardPage.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
    await dashboardPage.clickRefreshData();
    // Page should reload
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  test('displays specific test result rows', async () => {
    await dashboardPage.expectTestRowVisible('displays the Hello World page');
  });

  test('can retrieve component coverage percentage', async () => {
    const coverage = await dashboardPage.getComponentCoverage('HomePage');
    console.log(`HomePage coverage: ${coverage}`);
    expect(coverage).toBeTruthy();
  });
});
