const { expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    const pageUrl = pathToFileURL(path.join(__dirname, '..', 'public', 'dashboard.html'));
    await this.page.goto(pageUrl.href);
  }

  async navigateTo() {
    await this.page.goto('file:///C:/Projects/playwright-hello-world/public/dashboard.html');
  }

  // Header & Title
  async expectPageTitle(title) {
    await expect(this.page).toHaveTitle(title);
  }

  async getMainHeading() {
    return this.page.getByRole('heading', { name: /Dashboard/i });
  }

  async expectMainHeadingVisible() {
    await expect(await this.getMainHeading()).toBeVisible();
  }

  async expectSuccessAlert() {
    const alert = this.page.locator('.success-alert');
    await expect(alert).toBeVisible();
  }

  // Navigation
  async clickBackToHome() {
    await this.page.click('.btn-home');
  }

  async clickRefreshData() {
    await this.page.click('.btn-refresh');
  }

  // Metrics section
  async expectMetricsVisible() {
    const metrics = this.page.locator('.metric');
    await expect(metrics.first()).toBeVisible();
  }

  async getMetricCount() {
    return await this.page.locator('.metric').count();
  }

  async getMetricValue(index) {
    const metricValue = this.page.locator('.metric-value').nth(index);
    return await metricValue.textContent();
  }

  // Test results table
  async expectTestResultsTableVisible() {
    const table = this.page.locator('#testResultsTable');
    await expect(table).toBeVisible();
  }

  async getTestResultsRowCount() {
    return await this.page.locator('#testResultsTable tbody tr').count();
  }

  async getTestResultByName(testName) {
    return await this.page.locator(`#testResultsTable tbody tr:has-text("${testName}")`);
  }

  async expectTestRowVisible(testName) {
    const row = await this.getTestResultByName(testName);
    await expect(row).toBeVisible();
  }

  async getTestResultStatus(testName) {
    const row = await this.getTestResultByName(testName);
    return await row.locator('.badge').textContent();
  }

  // Coverage table
  async expectCoverageTableVisible() {
    const table = this.page.locator('#coverageTable');
    await expect(table).toBeVisible();
  }

  async getCoverageRowCount() {
    return await this.page.locator('#coverageTable tbody tr').count();
  }

  async getComponentCoverage(componentName) {
    const row = this.page.locator(`#coverageTable tbody tr:has-text("${componentName}")`);
    return await row.locator('td').nth(2).textContent(); // Coverage percentage column
  }

  // Wait for navigation
  async waitForNavigationToHome() {
    await this.page.waitForURL('**/index.html');
  }
}

module.exports = { DashboardPage };
