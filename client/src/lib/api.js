import { API_BASE_URL } from './config';

const api = {
  // Auth endpoints
  login: (credentials) => 
    fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }),

  register: (userData) => 
    fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }),

  // Blog endpoints
  getBlogs: (params = '') => 
    fetch(`${API_BASE_URL}/blogs${params}`),

  getBlog: (id) => 
    fetch(`${API_BASE_URL}/blogs/${id}`),

  createBlog: (blogData, token) => 
    fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(blogData)
    }),

  updateBlog: (id, blogData, token) => 
    fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(blogData)
    }),

  deleteBlog: (id, token) => 
    fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }),

  // User endpoints
  getCurrentUser: (token) => 
    fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }),

  // Media upload
  uploadMedia: (formData, token) =>
    fetch(`${API_BASE_URL}/media/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
};

export default api;
