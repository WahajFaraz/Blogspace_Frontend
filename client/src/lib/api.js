import { createApiUrl, getBlogsUrl } from './urlUtils';
import { config } from './config';

const api = {
  // Auth endpoints
  login: async (credentials) => {
    const response = await fetch(createApiUrl('users/login'), {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
      mode: 'cors'
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Login failed');
    }
    
    return response;
  },

  register: async (userData) => {
    const response = await fetch(createApiUrl('users/register'), {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(userData),
      mode: 'cors'
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Registration failed');
    }
    
    return response;
  },

  // Blog endpoints
  getBlogs: async (params = '') => {
    // Parse the params string into an object
    const paramsObj = {};
    if (params) {
      const searchParams = new URLSearchParams(
        params.startsWith('?') ? params.slice(1) : params
      );
      searchParams.forEach((value, key) => {
        paramsObj[key] = value;
      });
    }

    // Use the new URL utility function
    const url = getBlogsUrl(paramsObj);
    console.log('Fetching blogs from:', url);

    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    });

    return response;
  },

  getBlog: (id) => {
    return fetch(createApiUrl(`blogs/${id}`), {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    });
  },

  createBlog: async (blogData, token) => {
    const response = await fetch(createApiUrl('blogs'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(blogData),
      mode: 'cors'
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to create blog');
    }
    
    return response;
  },

  updateBlog: (id, blogData, token) => {
    return fetch(createApiUrl(`blogs/${id}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(blogData),
      mode: 'cors'
    });
  },

  deleteBlog: async (id, token) => {
    const response = await fetch(createApiUrl(`blogs/${id}`), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      mode: 'cors'
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to delete blog');
    }
    
    return response;
  },

  // User endpoints
  getCurrentUser: async (token) => {
    const response = await fetch(createApiUrl('users/me'), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors'
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch user');
    }
    
    return response;
  },

  // Media upload
  uploadMedia: async (formData, token) => {
    const response = await fetch(createApiUrl('media/upload'), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: formData,
      mode: 'cors'
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to upload media');
    }
    
    return response;
  }
};

export default api;
