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
  
  // Ensure we don't have double slashes by properly constructing the path
  const apiPath = `/api/v1/${cleanEndpoint}`.replace(/\/+/g, '/');
  
  // Construct the full URL
  const url = new URL(baseUrl + apiPath);
  
  if (params && Object.keys(params).length > 0) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }
  
  return url.toString();
};

/**
 * Creates a URL for the blogs endpoint
 * @param {Object} [params] - Query parameters
 * @returns {string} The blogs API URL
 */
export const getBlogsUrl = (params = {}) => {
  return createApiUrl('blogs', params);
};
