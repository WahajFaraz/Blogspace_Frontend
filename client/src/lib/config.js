// Environment configuration
export const config = {
  // API base URL from environment variable or fallback
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL || 'https://blogspace-orpin.vercel.app').replace(/\/+$/, ''),
  
  // API version prefix
  apiVersion: 'v1',
  
  // Default cache settings
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000 // 5 minutes
  },
  
  // Default request timeout (in milliseconds)
  timeout: 30000,
  
  // Default headers for API requests
  defaultHeaders: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

// For backward compatibility
export const API_BASE_URL = config.apiBaseUrl;
