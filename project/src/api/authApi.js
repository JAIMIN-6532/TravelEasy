import axios from "axios";

// Mock API functions for authentication
export const login = async (email, password) => {
    // Simulate API call
    const response = await axios.post('http://localhost:8080/api/v1/user/signIn', {email, password});
    console.log(response.data);
    return response.data;
  };
  
  export const register = async (userData) => {
    // Simulate API call
    console.log(userData);
    const response = await axios.post('http://localhost:8080/api/v1/user/signUp', userData);
    console.log(response.data);
    return response.data;

  };