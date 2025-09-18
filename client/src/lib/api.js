import { API_BASE_URL } from './config';

const api = {
  // Auth endpoints
  login: (credentials) => 
    fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(credentials)
    }),

  register: (userData) => 
    fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(userData)
    }),

  // Blog endpoints
  getBlogs: async (params = '') => {
    const response = await fetch(`${API_BASE_URL}/blogs${params}`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch blogs');
    }
    
    return response;
  },

  getBlog: (id) => 
    fetch(`${API_BASE_URL}/blogs/${id}`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    }),

  createBlog: (blogData, token) => 
    fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(blogData)
    }),

  updateBlog: (id, blogData, token) => 
    fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(blogData)
    }),

  deleteBlog: (id, token) => 
    fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      credentials: 'include'
    }),

  // User endpoints
  getCurrentUser: (token) => 
    fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }),

  // Media upload
  uploadMedia: (formData, token) => 
    fetch(`${API_BASE_URL}/media/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: formData
    })
};

export default api;
