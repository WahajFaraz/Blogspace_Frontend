// Determine the base URL based on the environment
const rawUrl = import.meta.env.VITE_API_BASE_URL || 'https://blogs-backend-ebon.vercel.app';
export const API_BASE_URL = rawUrl.replace(/\/+$/, '');

export const config = {
  API_BASE_URL,
  endpoints: {
    blogs: 'blogs',
    users: '/users',
    media: '/media'
  }
};
