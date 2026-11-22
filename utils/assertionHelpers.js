// Assertion Helper Functions
// Provides reusable assertion and verification utilities

const { expect } = require('@playwright/test');

/**
 * Assert element is visible
 * @param {Locator} locator - Playwright locator
 * @param {string} elementName - Element name for error message
 */
async function assertVisible(locator, elementName = 'Element') {
  try {
    await expect(locator).toBeVisible();
  } catch (error) {
    throw new Error(`${elementName} is not visible: ${error.message}`);
  }
}

/**
 * Assert element contains text
 * @param {Locator} locator - Playwright locator
 * @param {string} text - Text to find
 * @param {string} elementName - Element name for error message
 */
async function assertContainsText(locator, text, elementName = 'Element') {
  try {
    await expect(locator).toContainText(text);
  } catch (error) {
    throw new Error(`${elementName} does not contain text "${text}": ${error.message}`);
  }
}

/**
 * Assert element is enabled
 * @param {Locator} locator - Playwright locator
 * @param {string} elementName - Element name for error message
 */
async function assertEnabled(locator, elementName = 'Element') {
  try {
    await expect(locator).toBeEnabled();
  } catch (error) {
    throw new Error(`${elementName} is not enabled: ${error.message}`);
  }
}

/**
 * Assert element is disabled
 * @param {Locator} locator - Playwright locator
 * @param {string} elementName - Element name for error message
 */
async function assertDisabled(locator, elementName = 'Element') {
  try {
    await expect(locator).toBeDisabled();
  } catch (error) {
    throw new Error(`${elementName} is not disabled: ${error.message}`);
  }
}

/**
 * Assert element has class
 * @param {Locator} locator - Playwright locator
 * @param {string} className - Class name to check
 * @param {string} elementName - Element name for error message
 */
async function assertHasClass(locator, className, elementName = 'Element') {
  try {
    await expect(locator).toHaveClass(new RegExp(className));
  } catch (error) {
    throw new Error(`${elementName} does not have class "${className}": ${error.message}`);
  }
}

/**
 * Assert element count matches expected
 * @param {Locator} locator - Playwright locator
 * @param {number} expectedCount - Expected element count
 * @param {string} elementName - Element name for error message
 */
async function assertElementCount(locator, expectedCount, elementName = 'Elements') {
  try {
    await expect(locator).toHaveCount(expectedCount);
  } catch (error) {
    throw new Error(`${elementName} count mismatch (expected ${expectedCount}): ${error.message}`);
  }
}

/**
 * Assert text content matches
 * @param {Locator} locator - Playwright locator
 * @param {string|RegExp} expected - Expected text
 * @param {string} elementName - Element name for error message
 */
async function assertTextContent(locator, expected, elementName = 'Element') {
  try {
    if (typeof expected === 'string') {
      await expect(locator).toHaveText(expected);
    } else {
      const text = await locator.textContent();
      expect(text).toMatch(expected);
    }
  } catch (error) {
    throw new Error(`${elementName} text content mismatch: ${error.message}`);
  }
}

/**
 * Assert value in input field
 * @param {Locator} locator - Playwright locator
 * @param {string} expectedValue - Expected input value
 * @param {string} elementName - Element name for error message
 */
async function assertInputValue(locator, expectedValue, elementName = 'Input') {
  try {
    await expect(locator).toHaveValue(expectedValue);
  } catch (error) {
    throw new Error(`${elementName} value mismatch (expected "${expectedValue}"): ${error.message}`);
  }
}

/**
 * Assert element is not visible
 * @param {Locator} locator - Playwright locator
 * @param {string} elementName - Element name for error message
 */
async function assertNotVisible(locator, elementName = 'Element') {
  try {
    await expect(locator).not.toBeVisible();
  } catch (error) {
    throw new Error(`${elementName} should not be visible: ${error.message}`);
  }
}

/**
 * Assert page URL matches
 * @param {Page} page - Playwright page object
 * @param {string|RegExp} urlPattern - URL pattern to match
 */
async function assertPageUrl(page, urlPattern) {
  const url = page.url();
  if (typeof urlPattern === 'string') {
    if (!url.includes(urlPattern)) {
      throw new Error(`URL mismatch: ${url} does not include ${urlPattern}`);
    }
  } else {
    if (!urlPattern.test(url)) {
      throw new Error(`URL mismatch: ${url} does not match pattern ${urlPattern}`);
    }
  }
}

/**
 * Assert page title matches
 * @param {Page} page - Playwright page object
 * @param {string|RegExp} titlePattern - Title pattern to match
 */
async function assertPageTitle(page, titlePattern) {
  const title = await page.title();
  if (typeof titlePattern === 'string') {
    if (!title.includes(titlePattern)) {
      throw new Error(`Title mismatch: ${title} does not include ${titlePattern}`);
    }
  } else {
    if (!titlePattern.test(title)) {
      throw new Error(`Title mismatch: ${title} does not match pattern ${titlePattern}`);
    }
  }
}

module.exports = {
  assertVisible,
  assertContainsText,
  assertEnabled,
  assertDisabled,
  assertHasClass,
  assertElementCount,
  assertTextContent,
  assertInputValue,
  assertNotVisible,
  assertPageUrl,
  assertPageTitle
};
