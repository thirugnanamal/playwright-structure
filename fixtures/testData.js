// Test data for forms and user inputs

const validFormData = {
  name: 'Alice Johnson',
  email: 'alice.johnson@example.com',
  role: 'qa',
  message: 'Excited to learn about Playwright testing best practices!'
};

const invalidFormData = {
  emptyName: {
    name: '',
    email: 'test@example.com',
    role: 'qa',
    message: 'Test message'
  },
  invalidEmail: {
    name: 'John Doe',
    email: 'invalid-email',
    role: 'qa',
    message: 'Test message'
  },
  emptyRole: {
    name: 'John Doe',
    email: 'john@example.com',
    role: '',
    message: 'Test message'
  }
};

const formDataVariations = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'qa',
    message: 'Love Playwright for E2E testing!'
  },
  {
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    role: 'dev',
    message: 'Great testing framework'
  },
  {
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'manager',
    message: 'Looking forward to using this'
  },
  {
    name: 'Lisa Chen',
    email: 'lisa.chen@example.com',
    role: 'other',
    message: 'Impressive testing capabilities'
  }
];

const expectedDashboardMetrics = {
  testCases: '847',
  passRate: '94.3%',
  avgDuration: '2.4s',
  testSuites: '12'
};

const expectedTestResults = [
  { name: 'displays the Hello World page', suite: 'Pages', status: 'Passed' },
  { name: 'form submission redirects to dashboard', suite: 'Journeys', status: 'Passed' },
  { name: 'user can fill form with valid data', suite: 'Components', status: 'Passed' },
  { name: 'email field validates correctly', suite: 'Validation', status: 'Flaky' },
  { name: 'navigation buttons are clickable', suite: 'Interactions', status: 'Passed' }
];

const expectedCoverage = [
  { component: 'HomePage', tests: '5', coverage: '95%', status: 'Excellent' },
  { component: 'DashboardPage', tests: '4', coverage: '88%', status: 'Good' },
  { component: 'UserForm Component', tests: '8', coverage: '92%', status: 'Excellent' },
  { component: 'Navigation Component', tests: '3', coverage: '85%', status: 'Good' }
];

module.exports = {
  validFormData,
  invalidFormData,
  formDataVariations,
  expectedDashboardMetrics,
  expectedTestResults,
  expectedCoverage
};
