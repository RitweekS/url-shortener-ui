/**
 * Generates a random short code for URLs
 */
export const generateShortCode = (length: number = 6): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};

/**
 * Validates a URL and returns specific validation errors
 */
export const validateUrl = (url: string): { isValid: boolean; error: string | null } => {
  if (!url.trim()) {
    return { isValid: false, error: 'Please enter a URL' };
  }

  // Add protocol if missing
  const urlToTest = !/^https?:\/\//i.test(url) ? 'https://' + url : url;

  try {
    const parsedUrl = new URL(urlToTest);
    
    // Check for valid protocol
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return { isValid: false, error: 'URL must use HTTP or HTTPS protocol' };
    }

    // Check for valid domain
    if (!parsedUrl.hostname.includes('.')) {
      return { isValid: false, error: 'Please enter a valid domain name' };
    }

    // Check minimum length
    if (parsedUrl.hostname.length < 3) {
      return { isValid: false, error: 'Domain name is too short' };
    }

    return { isValid: true, error: null };
  } catch (e) {
    return { isValid: false, error: 'Please enter a valid URL' };
  }
};

/**
 * Ensure URL has a protocol
 */
export const ensureHttps = (url: string): string => {
  if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url;
  }
  return url;
};

/**
 * Format the creation date
 */
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};