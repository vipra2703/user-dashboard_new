const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const userService = {
  async getUsers() {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  async getUserById(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  },

  async getUserPosts(userId) {
    const response = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user posts');
    }
    return response.json();
  }
};
