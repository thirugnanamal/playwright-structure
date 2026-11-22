// UserProfileCard Component
// Reusable component used across multiple pages

class UserProfileCard {
  constructor(page) {
    this.page = page;
  }

  // Build the HTML for the component
  static getComponentHTML(userName, userRole, userEmail) {
    return `
      <div class="user-profile-card">
        <div class="profile-avatar">
          <span class="avatar-initials">${userName.split(' ').map(n => n[0]).join('')}</span>
        </div>
        <div class="profile-content">
          <h3 class="profile-name">${userName}</h3>
          <p class="profile-role">
            <span class="role-badge">${userRole}</span>
          </p>
          <p class="profile-email">
            <strong>Email:</strong> ${userEmail}
          </p>
        </div>
        <div class="profile-actions">
          <button class="btn-view-profile" data-user="${userName}">View Profile</button>
          <button class="btn-edit-profile" data-user="${userName}">Edit</button>
        </div>
      </div>
    `;
  }

  // Get the component element
  getProfileCard(userName) {
    return this.page.locator(`.user-profile-card:has-text("${userName}")`);
  }

  // Verify component is visible
  async expectProfileCardVisible(userName) {
    const card = this.getProfileCard(userName);
    const { expect } = require('@playwright/test');
    await expect(card).toBeVisible();
  }

  // Get user name from card
  async getProfileName(userName) {
    return this.page.locator(`.user-profile-card:has-text("${userName}") .profile-name`);
  }

  // Get user role from card
  async getProfileRole(userName) {
    return this.page.locator(`.user-profile-card:has-text("${userName}") .role-badge`);
  }

  // Get user email from card
  async getProfileEmail(userName) {
    return this.page.locator(`.user-profile-card:has-text("${userName}") .profile-email`);
  }

  // Click view profile button
  async clickViewProfile(userName) {
    await this.page.click(`.user-profile-card:has-text("${userName}") .btn-view-profile`);
  }

  // Click edit profile button
  async clickEditProfile(userName) {
    await this.page.click(`.user-profile-card:has-text("${userName}") .btn-edit-profile`);
  }

  // Verify all profile details
  async expectProfileDetails(userName, role, email) {
    const { expect } = require('@playwright/test');
    
    const nameElement = await this.getProfileName(userName);
    const roleElement = await this.getProfileRole(userName);
    const emailElement = await this.getProfileEmail(userName);

    await expect(nameElement).toContainText(userName);
    await expect(roleElement).toContainText(role);
    await expect(emailElement).toContainText(email);
  }

  // Count how many profile cards are visible
  async getProfileCardCount() {
    return await this.page.locator('.user-profile-card').count();
  }

  // Get all visible profile cards
  async getAllProfileCards() {
    return await this.page.locator('.user-profile-card');
  }
}

module.exports = { UserProfileCard };
