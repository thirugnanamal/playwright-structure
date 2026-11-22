const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { UserProfileCard } = require('../../components/UserProfileCard');

test.describe('User Profile Card Component Tests', () => {
  test.describe('On Home Page', () => {
    let homePage;
    let profileCard;

    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      profileCard = new UserProfileCard(page);
      await homePage.navigate();
    });

    test('displays user profile cards on home page', async () => {
      const cardCount = await profileCard.getProfileCardCount();
      expect(cardCount).toBeGreaterThan(0);
      console.log(`Found ${cardCount} profile cards on home page`);
    });

    test('profile card displays correct user information', async () => {
      await profileCard.expectProfileCardVisible('John Doe');
      await profileCard.expectProfileDetails('John Doe', 'QA Engineer', 'john.doe@example.com');
    });

    test('profile card shows user avatar with initials', async () => {
      const avatar = homePage.page.locator('.profile-avatar:has-text("JD")');
      await expect(avatar).toBeVisible();
    });

    test('profile card shows role badge', async () => {
      const roleBadge = homePage.page.locator('.role-badge:has-text("QA Engineer")');
      await expect(roleBadge).toBeVisible();
    });

    test('profile card action buttons are clickable', async ({ page }) => {
      const viewButton = page.locator('.btn-view-profile[data-user="John Doe"]');
      const editButton = page.locator('.btn-edit-profile[data-user="John Doe"]');
      
      await expect(viewButton).toBeVisible();
      await expect(editButton).toBeVisible();
    });

    test('all profile information is visible and readable', async () => {
      const nameElement = homePage.page.locator('.profile-name:has-text("John Doe")');
      const emailElement = homePage.page.locator('.profile-email:has-text("john.doe@example.com")');
      const roleElement = homePage.page.locator('.role-badge:has-text("QA Engineer")');
      
      await expect(nameElement).toBeVisible();
      await expect(emailElement).toBeVisible();
      await expect(roleElement).toBeVisible();
    });
  });

  test.describe('On Dashboard Page', () => {
    let dashboardPage;
    let profileCard;

    test.beforeEach(async ({ page }) => {
      dashboardPage = new DashboardPage(page);
      profileCard = new UserProfileCard(page);
      await dashboardPage.navigate();
    });

    test('displays user profile cards on dashboard', async () => {
      const cardCount = await profileCard.getProfileCardCount();
      expect(cardCount).toBeGreaterThan(0);
      console.log(`Found ${cardCount} profile cards on dashboard`);
    });

    test('dashboard profile cards show team member information', async () => {
      await profileCard.expectProfileCardVisible('Alice Brown');
      await profileCard.expectProfileDetails('Alice Brown', 'QA Lead', 'alice.brown@example.com');
    });

    test('profile card avatar shows correct initials for each user', async ({ page }) => {
      const aliceAvatar = page.locator('.profile-avatar:has-text("AB")');
      const markAvatar = page.locator('.profile-avatar:has-text("MG")');
      
      await expect(aliceAvatar).toBeVisible();
      await expect(markAvatar).toBeVisible();
    });

    test('all team members visible on dashboard', async () => {
      const cardCount = await profileCard.getProfileCardCount();
      console.log(`Dashboard shows ${cardCount} team member(s)`);
      
      // Verify specific team members
      await profileCard.expectProfileCardVisible('Alice Brown');
      await profileCard.expectProfileCardVisible('Mark Green');
    });
  });

  test.describe('Component Consistency Across Pages', () => {
    test('profile card component looks the same on all pages', async ({ page }) => {
      // Test that component styling is consistent
      const homePage = new HomePage(page);
      await homePage.navigate();
      
      const homeCardStyle = await page.locator('.user-profile-card').first().evaluate(el => 
        window.getComputedStyle(el).borderRadius
      );
      
      // Go to dashboard
      const dashboardPage = new DashboardPage(page);
      await dashboardPage.navigate();
      
      const dashboardCardStyle = await page.locator('.user-profile-card').first().evaluate(el => 
        window.getComputedStyle(el).borderRadius
      );
      
      // Verify consistency
      expect(homeCardStyle).toBe(dashboardCardStyle);
      console.log(`Component styling consistent: ${homeCardStyle}`);
    });
  });

  test.describe('Component Interaction', () => {
    test('profile card buttons are interactive', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.navigate();
      
      const viewButton = page.locator('.btn-view-profile[data-user="John Doe"]');
      const editButton = page.locator('.btn-edit-profile[data-user="John Doe"]');
      
      // Verify buttons exist and are visible
      await expect(viewButton).toBeVisible();
      await expect(editButton).toBeVisible();
      
      // Verify buttons are enabled
      await expect(viewButton).toBeEnabled();
      await expect(editButton).toBeEnabled();
      
      console.log('Profile card buttons are interactive');
    });

    test('profile card data attributes are correct', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.navigate();
      
      const viewButton = page.locator('.btn-view-profile[data-user="John Doe"]');
      const userAttr = await viewButton.getAttribute('data-user');
      
      expect(userAttr).toBe('John Doe');
      console.log(`User data attribute: ${userAttr}`);
    });
  });
});
