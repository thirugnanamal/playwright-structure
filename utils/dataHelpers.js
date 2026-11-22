// Data Helper Functions
// Provides reusable data generation and manipulation utilities

/**
 * Generate a random email address
 * @returns {string} Random email
 */
function generateRandomEmail() {
  const timestamp = Date.now();
  return `user${timestamp}@example.com`;
}

/**
 * Generate a random user name
 * @returns {string} Random user name
 */
function generateRandomName() {
  const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Sarah', 'Mike'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Davis', 'Wilson'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
}

/**
 * Generate random form data
 * @returns {Object} Random form data object
 */
function generateRandomFormData() {
  const roles = ['qa', 'dev', 'manager', 'other'];
  const messages = [
    'Great testing framework!',
    'Love Playwright!',
    'Impressed with the capabilities',
    'Excited to test with this tool',
    'Professional testing solution'
  ];

  return {
    name: generateRandomName(),
    email: generateRandomEmail(),
    role: roles[Math.floor(Math.random() * roles.length)],
    message: messages[Math.floor(Math.random() * messages.length)]
  };
}

/**
 * Get user initials from name
 * @param {string} name - Full name
 * @returns {string} User initials (e.g., "JD" for "John Doe")
 */
function getUserInitials(name) {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
function formatDate(date = new Date()) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

/**
 * Wait for a specified time
 * @param {number} ms - Milliseconds to wait
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function until it succeeds
 * @param {Function} fn - Function to retry
 * @param {number} maxAttempts - Maximum retry attempts
 * @param {number} delayMs - Delay between retries
 */
async function retry(fn, maxAttempts = 3, delayMs = 1000) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxAttempts - 1) throw error;
      await wait(delayMs);
    }
  }
}

/**
 * Generate test report summary
 * @param {Object} stats - Test statistics
 * @returns {Object} Formatted test report
 */
function generateTestReport(stats) {
  return {
    totalTests: stats.total || 0,
    passed: stats.passed || 0,
    failed: stats.failed || 0,
    skipped: stats.skipped || 0,
    passRate: stats.total > 0 ? ((stats.passed / stats.total) * 100).toFixed(2) + '%' : '0%',
    duration: stats.duration || '0s',
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  generateRandomEmail,
  generateRandomName,
  generateRandomFormData,
  getUserInitials,
  formatDate,
  wait,
  retry,
  generateTestReport
};
