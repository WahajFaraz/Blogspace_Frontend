import { getBlogsUrl } from './urlUtils';
import { API_BASE_URL, config } from './config';

// Helper function to create a properly formatted URL
const createApiUrl = (endpoint) => {
  // This is a fallback, but we'll use the new URL utility functions directly
  const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'https://blogs-backend-ebon.vercel.app').replace(/\/+$/, '');
  const cleanEndpoint = endpoint.replace(/^\/+/, '');
  return `${baseUrl}/api/v1/${cleanEndpoint}`.replace(/([^:]\/)\/+/g, '$1');
};

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
    const response = await fetch(createApiUrl('api/v1/users/register'), {
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
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch blogs');
    }
    
    return response;
  },

  getBlog: (id) => 
    fetch(createApiUrl(`api/v1/blogs/${id}`), {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    }),

  createBlog: async (blogData, token) => {
    const response = await fetch(createApiUrl('api/v1/blogs'), {
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

  updateBlog: async (id, blogData, token) => {
    const response = await fetch(createApiUrl(`api/v1/blogs/${id}`), {
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

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to update blog');
    }
    
    return response;
  },

  deleteBlog: async (id, token) => {
    const response = await fetch(createApiUrl(`api/v1/blogs/${id}`), {
      method: 'DELETE',
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
      throw new Error(error.message || 'Failed to delete blog');
    }
    
    return response;
  },

  // User endpoints
  getCurrentUser: async (token) => {
    const response = await fetch(createApiUrl('api/v1/users/me'), {
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
    const response = await fetch(createApiUrl('api/v1/media/upload'), {
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
