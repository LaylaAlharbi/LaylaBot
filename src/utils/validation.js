export function validateOpenAiKey(key) {
    if (!key) return false;
    // Basic validation pattern for OpenAI keys
    const pattern = /^sk-[a-zA-Z0-9]{32,}$/;
    return pattern.test(key);
  }
  
  export function handleApiKeyError(error) {
    if (error.response?.status === 401) {
      return 'Invalid API key - please check your OpenAI key in settings';
    }
    if (error.response?.status === 429) {
      return 'API rate limit exceeded - please try again later';
    }
    return error.message || 'Failed to process request';
  }