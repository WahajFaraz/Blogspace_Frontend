const rawUrl = import.meta.env.VITE_API_BASE_URL || 'https://blogs-backend-ebon.vercel.app';

export const API_BASE_URL = rawUrl.replace(/\/+$/, '');

const API_PREFIX = '/api/v1';

export const config = {
  API_BASE_URL,
  API_PREFIX,
  endpoints: {
    blogs: `${API_PREFIX}/blogs`,
    users: `${API_PREFIX}/users`,
    media: `${API_PREFIX}/media`
  }
};
