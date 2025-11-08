// Simple in-memory database for development
class MockDatabase {
  constructor() {
    this.designs = new Map();
    this.users = new Map();
  }

  // Design operations
  async saveDesign(design) {
    this.designs.set(design.id, {
      ...design,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return design;
  }

  async getDesign(id) {
    return this.designs.get(id) || null;
  }

  async getAllDesigns() {
    return Array.from(this.designs.values());
  }

  async updateDesign(id, updates) {
    const existing = this.designs.get(id);
    if (!existing) return null;
    
    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.designs.set(id, updated);
    return updated;
  }

  async deleteDesign(id) {
    return this.designs.delete(id);
  }

  // User operations (for future use)
  async saveUser(user) {
    this.users.set(user.id, {
      ...user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return user;
  }

  async getUser(id) {
    return this.users.get(id) || null;
  }

  // Statistics
  getStats() {
    return {
      totalDesigns: this.designs.size,
      totalUsers: this.users.size,
      recentDesigns: Array.from(this.designs.values())
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10)
    };
  }
}

// Singleton instance
const db = new MockDatabase();

module.exports = db;