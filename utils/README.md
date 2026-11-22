# 🛠️ Utils Folder

This folder contains **helper functions** and **utilities** that support testing. These reusable utilities reduce code duplication and improve test maintainability.

## Contents

### `formHelpers.js`
Reusable functions for form interactions.

**Available Functions:**
- `fillUserForm(page, formData)` - Fill form fields with data
- `submitUserForm(page)` - Submit form
- `resetUserForm(page)` - Reset form to empty
- `completeFormSubmission(page, formData)` - Fill and submit in one call
- `getFormFieldValue(page, fieldId)` - Get field value
- `verifyFormFieldsAreFilled(page, expectedData)` - Verify form contents

**Usage:**
```javascript
const { fillUserForm, submitUserForm } = require('../../utils/formHelpers');
const { validFormData } = require('../../fixtures/testData');

test('submit form', async ({ page }) => {
  await fillUserForm(page, validFormData);
  await submitUserForm(page);
});
```

### `navigationHelpers.js`
Reusable functions for page navigation.

**Available Functions:**
- `navigateToDashboard(page)` - Navigate to dashboard
- `navigateToAbout(page)` - Navigate to about page
- `goBackToHome(page)` - Return to home page
- `waitForPageNavigation(page, urlPattern)` - Wait for navigation
- `verifyPageTitle(page, expectedTitle)` - Verify page title
- `verifyPageUrl(page, urlPattern)` - Verify page URL

**Usage:**
```javascript
const { navigateToDashboard, verifyPageTitle } = require('../../utils/navigationHelpers');

test('navigate and verify', async ({ page }) => {
  await navigateToDashboard(page);
  await verifyPageTitle(page, 'Dashboard');
});
```

### `dataHelpers.js`
Reusable functions for data generation and manipulation.

**Available Functions:**
- `generateRandomEmail()` - Generate random email
- `generateRandomName()` - Generate random name
- `generateRandomFormData()` - Generate complete random form data
- `getUserInitials(name)` - Get initials from name
- `formatDate(date)` - Format date to string
- `wait(ms)` - Wait for specified time
- `retry(fn, maxAttempts, delayMs)` - Retry function until success
- `generateTestReport(stats)` - Create test report summary

**Usage:**
```javascript
const { generateRandomFormData, wait, retry } = require('../../utils/dataHelpers');

test('submit with random data', async ({ page }) => {
  const formData = generateRandomFormData();
  await fillForm(page, formData);
});

test('retry action', async ({ page }) => {
  await retry(async () => {
    await page.click('#submitBtn');
  }, 3, 1000);
});
```

### `assertionHelpers.js`
Reusable functions for assertions and verification.

**Available Functions:**
- `assertVisible(locator, elementName)` - Assert element visible
- `assertContainsText(locator, text, elementName)` - Assert text exists
- `assertEnabled(locator, elementName)` - Assert element enabled
- `assertDisabled(locator, elementName)` - Assert element disabled
- `assertHasClass(locator, className, elementName)` - Assert element has class
- `assertElementCount(locator, count, elementName)` - Assert count matches
- `assertTextContent(locator, expected, elementName)` - Verify text content
- `assertInputValue(locator, expectedValue, elementName)` - Verify input value
- `assertNotVisible(locator, elementName)` - Assert element not visible
- `assertPageUrl(page, urlPattern)` - Verify page URL
- `assertPageTitle(page, titlePattern)` - Verify page title

**Usage:**
```javascript
const { assertVisible, assertInputValue } = require('../../utils/assertionHelpers');

test('verify form state', async ({ page }) => {
  const input = page.locator('#userName');
  await assertVisible(input, 'User name input');
  await assertInputValue(input, 'Expected Value', 'User name');
});
```

### `testConfigHelpers.js`
Reusable functions for test setup and configuration.

**Available Functions:**
- `waitForElementReady(page, selector, timeout)` - Wait for element ready
- `takeScreenshot(page, fileName)` - Take screenshot for debugging
- `logTestInfo(message, data)` - Log with timestamp
- `getAccessibilityTree(page)` - Get page accessibility tree
- `verifyNoConsoleErrors(page)` - Check for console errors
- `getPerformanceMetrics(page)` - Get page performance data
- `waitForNetworkIdle(page, timeout)` - Wait for network idle
- `dismissAllDialogs(page)` - Close all dialogs
- `setViewportSize(page, width, height)` - Set viewport size
- `scrollIntoView(page, selector)` - Scroll element into view

**Usage:**
```javascript
const { takeScreenshot, waitForElementReady, logTestInfo } = require('../../utils/testConfigHelpers');

test('debug test', async ({ page }) => {
  logTestInfo('Starting form test');
  await waitForElementReady(page, '#userName');
  await fillForm(page, data);
  logTestInfo('Form filled, taking screenshot');
  await takeScreenshot(page, 'form-filled');
});
```

## Best Practices

✅ **Keep helpers focused** - One function per concern
✅ **Write descriptive functions** - Function name should describe action
✅ **Add JSDoc comments** - Document parameters and return values
✅ **Handle errors gracefully** - Provide meaningful error messages
✅ **Make reusable** - Write for multiple use cases
✅ **Test your helpers** - Ensure helpers work before using
✅ **Keep DRY** - Extract common patterns into helpers

## Adding New Helpers

1. Create a new JS file in this folder
2. Write focused utility functions
3. Add JSDoc comments
4. Export functions
5. Update this README with examples

## Example: Custom Helper

```javascript
// utils/apiHelpers.js
/**
 * Make API request
 * @param {Page} page - Playwright page
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method
 * @returns {Promise<Object>} Response data
 */
async function makeRequest(page, endpoint, method = 'GET') {
  return await page.evaluate(async ({ endpoint, method }) => {
    const response = await fetch(endpoint, { method });
    return await response.json();
  }, { endpoint, method });
}

module.exports = { makeRequest };
```

## Importing Helpers

```javascript
// In your test file
const { fillUserForm, submitUserForm } = require('../../utils/formHelpers');
const { navigateToDashboard } = require('../../utils/navigationHelpers');
const { generateRandomFormData } = require('../../utils/dataHelpers');
const { assertVisible } = require('../../utils/assertionHelpers');
const { takeScreenshot } = require('../../utils/testConfigHelpers');

test('complete workflow', async ({ page }) => {
  const data = generateRandomFormData();
  await fillUserForm(page, data);
  await submitUserForm(page);
  await navigateToDashboard(page);
  await takeScreenshot(page, 'dashboard');
});
```

---

**Use these helpers to write clean, maintainable, and DRY tests!** ✨
