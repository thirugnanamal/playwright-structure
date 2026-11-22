# 📁 Fixtures Folder

This folder contains **test data** and **fixtures** used across test suites. It provides reusable, centralized data for testing.

## Contents

### `users.json`
Sample user data with realistic information used for testing user-related features.

**Usage:**
```javascript
const users = require('../../fixtures/users.json');

test('display user profile', async ({ page }) => {
  const user = users.users[0];
  // Use user data in test
});
```

### `testData.js`
Centralized test data including:
- **Valid form data** - Correct inputs for positive tests
- **Invalid form data** - Incorrect inputs for negative tests
- **Form data variations** - Multiple data sets for data-driven tests
- **Expected dashboard metrics** - Verification data
- **Expected test results** - Assertion data
- **Expected coverage data** - Coverage metrics

**Usage:**
```javascript
const { validFormData, formDataVariations } = require('../../fixtures/testData');

test('submit valid form', async ({ page }) => {
  await fillForm(page, validFormData);
});

test.describe('data-driven tests', () => {
  formDataVariations.forEach(data => {
    test(`submit form with ${data.role}`, async ({ page }) => {
      await fillForm(page, data);
    });
  });
});
```

## Best Practices

✅ **Keep data fixtures separate** - Improves maintainability
✅ **Use descriptive names** - Makes data purpose clear
✅ **Group related data** - Organize by feature/page
✅ **Update centrally** - Single source of truth
✅ **Use for negative tests** - Invalid data helps test error handling
✅ **Enable data-driven testing** - Reuse same test with multiple datasets

## Adding New Fixtures

1. Create a new JSON or JS file in this folder
2. Add descriptive data relevant to your tests
3. Import in your test files
4. Update this README with examples

## Example: Adding Customer Fixtures

```javascript
// fixtures/customers.json
{
  "customers": [
    {
      "id": 1,
      "name": "Acme Corp",
      "email": "contact@acme.com",
      "industry": "Technology"
    }
  ]
}

// In your test
const { customers } = require('../../fixtures/customers.json');
test('verify customer data', () => {
  const customer = customers[0];
  expect(customer.name).toBe('Acme Corp');
});
```
