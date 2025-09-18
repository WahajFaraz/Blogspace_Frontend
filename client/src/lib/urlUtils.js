/**
 * Creates a properly formatted API URL
 * @param {string} endpoint - The API endpoint (e.g., 'blogs', 'users/login')
 * @param {Object} [params] - Optional query parameters as an object
 * @returns {string} The fully constructed URL
 */
export const createApiUrl = (endpoint, params = {}) => {
  // Base URL without trailing slash
  const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'https://blogs-backend-ebon.vercel.app').replace(/\/+$/, '');
  
  // Remove leading slashes from endpoint
  const cleanEndpoint = endpoint.replace(/^\/+/, '');
  
  // Construct the full URL
  const url = new URL(`${baseUrl}/api/v1/${cleanEndpoint}`);
  
  // Add query parameters if provided
  if (params && Object.keys(params).length > 0) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }
  
  // Return the URL string, ensuring no double slashes
  return url.toString().replace(/([^:]\/)\/+/g, '$1');
};

/**
 * Creates a URL for the blogs endpoint
 * @param {Object} [params] - Query parameters
 * @returns {string} The blogs API URL
 */
export const getBlogsUrl = (params = {}) => {
  return createApiUrl('blogs', params);
};
