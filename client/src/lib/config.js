// Determine the base URL based on the environment
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://blogs-backend-ebon.vercel.app/api/v1';

// Set the base URL in the global config
export const config = {
  API_BASE_URL,
  endpoints: {
    blogs: '/blogs',
    users: '/users',
    media: '/media'
  }
};
