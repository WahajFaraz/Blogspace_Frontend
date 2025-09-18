// Determine the base URL based on the environment
export const API_BASE_URL = import.meta.env.DEV
  ? 'https://blogs-backend-ebon.vercel.app'
  : 'https://blogs-backend-ebon.vercel.app';

export const config = {
  API_BASE_URL,
};
