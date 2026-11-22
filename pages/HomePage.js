const { expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

class HomePage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    const pageUrl = pathToFileURL(path.join(__dirname, '..', 'public', 'index.html'));
    await this.page.goto(pageUrl.href, { waitUntil: 'networkidle' });
  }

  // Header & Title
  async expectPageTitle(title) {
    await expect(this.page).toHaveTitle(title);
  }

  async getMainHeading() {
    return this.page.getByRole('heading', { name: /Playwright Demo App/i });
  }

  async expectMainHeadingVisible() {
    await expect(await this.getMainHeading()).toBeVisible();
  }

  // Form elements
  async fillUserName(name) {
    await this.page.fill('#userName', name);
  }

  async fillUserEmail(email) {
    await this.page.fill('#userEmail', email);
  }

  async selectUserRole(role) {
    await this.page.selectOption('#userRole', role);
  }

  async fillUserMessage(message) {
    await this.page.fill('#userMessage', message);
  }

  async submitForm() {
    await this.page.click('#submitBtn');
  }

  async expectSuccessMessage() {
    const message = this.page.locator('#successMessage');
    await expect(message).toHaveClass(/show/);
  }

  async clearForm() {
    await this.page.click('button[type="reset"]');
  }

  // Navigation buttons
  async clickGoDashboard() {
    await this.page.click('#goDashboardBtn');
  }

  async clickGoAbout() {
    await this.page.click('#goAboutBtn');
  }

  // Content verification
  async expectFeatureListVisible() {
    const features = this.page.locator('.feature-list li');
    await expect(features.first()).toBeVisible();
  }

  async expectStatsVisible() {
    const stats = this.page.locator('.stat-card');
    await expect(stats.first()).toBeVisible();
  }

  async getFeatureCount() {
    return await this.page.locator('.feature-list li').count();
  }

  async getStatCount() {
    return await this.page.locator('.stat-card').count();
  }

  // Form validation
  async fillAndSubmitForm(name, email, role, message) {
    await this.fillUserName(name);
    await this.fillUserEmail(email);
    await this.selectUserRole(role);
    await this.fillUserMessage(message);
    await this.submitForm();
  }

  // Wait for navigation
  async waitForNavigationToDashboard() {
    await this.page.waitForURL('**/dashboard.html');
  }
}

module.exports = { HomePage };
