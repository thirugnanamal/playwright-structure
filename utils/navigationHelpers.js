// Navigation Helper Functions
// Provides reusable navigation utilities

/**
 * Navigate to home page
 * @param {Page} page - Playwright page object
 */
async function navigateToHome(page) {
  await page.click('#goDashboardBtn') || await page.click('button:has-text("Home")');
}

/**
 * Navigate to dashboard
 * @param {Page} page - Playwright page object
 */
async function navigateToDashboard(page) {
  await page.click('#goDashboardBtn');
  await page.waitForURL('**/dashboard.html');
}

/**
 * Navigate to about page
 * @param {Page} page - Playwright page object
 */
async function navigateToAbout(page) {
  await page.click('#goAboutBtn');
  await page.waitForURL('**/about.html');
}

/**
 * Go back to home from any page
 * @param {Page} page - Playwright page object
 */
async function goBackToHome(page) {
  const backButton = page.locator('button:has-text("Back to Home")').first();
  if (await backButton.isVisible()) {
    await backButton.click();
    await page.waitForURL('**/index.html');
  }
}

/**
 * Wait for page navigation and load
 * @param {Page} page - Playwright page object
 * @param {string} urlPattern - URL pattern to wait for
 */
async function waitForPageNavigation(page, urlPattern) {
  await page.waitForURL(urlPattern);
  await page.waitForLoadState('networkidle');
}

/**
 * Verify current page title
 * @param {Page} page - Playwright page object
 * @param {string} expectedTitle - Expected page title
 */
async function verifyPageTitle(page, expectedTitle) {
  const title = await page.title();
  if (!title.includes(expectedTitle)) {
    throw new Error(`Page title mismatch: ${title} does not include ${expectedTitle}`);
  }
}

/**
 * Verify current page URL contains pattern
 * @param {Page} page - Playwright page object
 * @param {string} urlPattern - URL pattern to check
 */
async function verifyPageUrl(page, urlPattern) {
  const url = page.url();
  if (!url.includes(urlPattern)) {
    throw new Error(`URL mismatch: ${url} does not include ${urlPattern}`);
  }
}

module.exports = {
  navigateToHome,
  navigateToDashboard,
  navigateToAbout,
  goBackToHome,
  waitForPageNavigation,
  verifyPageTitle,
  verifyPageUrl
};
