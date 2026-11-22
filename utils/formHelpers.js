// Form Helper Functions
// Provides reusable form interaction utilities

/**
 * Fill user form with provided data
 * @param {Page} page - Playwright page object
 * @param {Object} formData - Form data object
 * @param {string} formData.name - User name
 * @param {string} formData.email - User email
 * @param {string} formData.role - User role
 * @param {string} formData.message - User message
 */
async function fillUserForm(page, formData) {
  if (formData.name) {
    await page.fill('#userName', formData.name);
  }
  if (formData.email) {
    await page.fill('#userEmail', formData.email);
  }
  if (formData.role) {
    await page.selectOption('#userRole', formData.role);
  }
  if (formData.message) {
    await page.fill('#userMessage', formData.message);
  }
}

/**
 * Submit the user form
 * @param {Page} page - Playwright page object
 */
async function submitUserForm(page) {
  await page.click('#submitBtn');
}

/**
 * Reset the user form
 * @param {Page} page - Playwright page object
 */
async function resetUserForm(page) {
  await page.click('button[type="reset"]');
}

/**
 * Complete form submission workflow
 * @param {Page} page - Playwright page object
 * @param {Object} formData - Form data
 */
async function completeFormSubmission(page, formData) {
  await fillUserForm(page, formData);
  await submitUserForm(page);
}

/**
 * Get form field value
 * @param {Page} page - Playwright page object
 * @param {string} fieldId - Field element ID
 */
async function getFormFieldValue(page, fieldId) {
  return await page.inputValue(`#${fieldId}`);
}

/**
 * Verify all form fields are filled
 * @param {Page} page - Playwright page object
 * @param {Object} expectedData - Expected form data
 */
async function verifyFormFieldsAreFilled(page, expectedData) {
  const name = await getFormFieldValue(page, 'userName');
  const email = await getFormFieldValue(page, 'userEmail');
  const message = await getFormFieldValue(page, 'userMessage');

  if (name !== expectedData.name) throw new Error(`Name mismatch: ${name} !== ${expectedData.name}`);
  if (email !== expectedData.email) throw new Error(`Email mismatch: ${email} !== ${expectedData.email}`);
  if (message !== expectedData.message) throw new Error(`Message mismatch: ${message} !== ${expectedData.message}`);
}

module.exports = {
  fillUserForm,
  submitUserForm,
  resetUserForm,
  completeFormSubmission,
  getFormFieldValue,
  verifyFormFieldsAreFilled
};
