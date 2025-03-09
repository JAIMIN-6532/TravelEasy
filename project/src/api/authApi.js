// Mock API functions for authentication
export const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ token: 'mock-token' });
      }, 1000);
    });
  };
  
  export const register = async (userData) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };