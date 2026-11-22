// Test Configuration and Setup Helpers
// Provides common test setup and configuration utilities

const { expect } = require('@playwright/test');

/**
 * Wait for element to be ready for interaction
 * @param {Page} page - Playwright page object
 * @param {string} selector - Element selector
 * @param {number} timeout - Timeout in milliseconds
 */
async function waitForElementReady(page, selector, timeout = 5000) {
  const locator = page.locator(selector);
  await locator.waitFor({ state: 'visible', timeout });
  await locator.waitFor({ state: 'enabled', timeout });
}

/**
 * Take screenshot for debugging
 * @param {Page} page - Playwright page object
 * @param {string} fileName - Screenshot file name
 */
async function takeScreenshot(page, fileName = 'screenshot') {
  const timestamp = new Date().getTime();
  const path = `./test-results/${fileName}-${timestamp}.png`;
  await page.screenshot({ path });
  return path;
}

/**
 * Log test information for debugging
 * @param {string} message - Log message
 * @param {any} data - Additional data to log
 */
function logTestInfo(message, data = null) {
  const timestamp = new Date().toISOString();
  if (data) {
    console.log(`[${timestamp}] ${message}`, data);
  } else {
    console.log(`[${timestamp}] ${message}`);
  }
}

/**
 * Get accessibility tree for debugging
 * @param {Page} page - Playwright page object
 */
async function getAccessibilityTree(page) {
  const snapshot = await page.accessibility.snapshot();
  return snapshot;
}

/**
 * Verify page has no console errors
 * @param {Page} page - Playwright page object
 */
async function verifyNoConsoleErrors(page) {
  const consoleErrors = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  if (consoleErrors.length > 0) {
    throw new Error(`Console errors found: ${consoleErrors.join(', ')}`);
  }
}

/**
 * Get all page performance metrics
 * @param {Page} page - Playwright page object
 */
async function getPerformanceMetrics(page) {
  return await page.evaluate(() => {
    const performance = window.performance;
    const navigationTiming = performance.getEntriesByType('navigation')[0];
    
    return {
      navigationStart: navigationTiming.navigationStart,
      responseEnd: navigationTiming.responseEnd,
      domContentLoaded: navigationTiming.domContentLoadedEventEnd,
      loadComplete: navigationTiming.loadEventEnd,
      totalLoadTime: navigationTiming.loadEventEnd - navigationTiming.navigationStart
    };
  });
}

/**
 * Wait for all network calls to complete
 * @param {Page} page - Playwright page object
 * @param {number} timeout - Timeout in milliseconds
 */
async function waitForNetworkIdle(page, timeout = 5000) {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Close all dialogs (alerts, confirms, etc.)
 * @param {Page} page - Playwright page object
 */
async function dismissAllDialogs(page) {
  page.on('dialog', dialog => {
    dialog.dismiss();
  });
}

/**
 * Set viewport size
 * @param {Page} page - Playwright page object
 * @param {number} width - Viewport width
 * @param {number} height - Viewport height
 */
async function setViewportSize(page, width = 1280, height = 720) {
  await page.setViewportSize({ width, height });
}

/**
 * Scroll element into view
 * @param {Page} page - Playwright page object
 * @param {string} selector - Element selector
 */
async function scrollIntoView(page, selector) {
  await page.locator(selector).scrollIntoViewIfNeeded();
}

module.exports = {
  waitForElementReady,
  takeScreenshot,
  logTestInfo,
  getAccessibilityTree,
  verifyNoConsoleErrors,
  getPerformanceMetrics,
  waitForNetworkIdle,
  dismissAllDialogs,
  setViewportSize,
  scrollIntoView
};
