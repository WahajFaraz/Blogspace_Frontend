export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://blogs-backend-ebon.vercel.app/api/v1').replace(/\/+$/, '');

export const config = {
  API_BASE_URL,
  endpoints: {
    blogs: '/blogs',
    users: '/users',
    media: '/media'
  }
};
