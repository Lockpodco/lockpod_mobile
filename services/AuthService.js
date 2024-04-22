const API_URL = "http://localhost:3000";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed!');
    }

    const data = await response.json();
    // You should receive a token and user details here if login is successful
    // Save the token in your app's state or in persistent storage
    return data;
  } catch (error) {
    console.error('AuthService login error:', error);
    throw error;
  }
};

// Define a register function if you need to handle user registration in AuthService
export const register = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        // Convert non-2xx HTTP responses into errors:
        const errorData = await response.json();
        throw new Error(errorData.message || 'Unable to register.');
      }
  
      const data = await response.json();
      // Here you could return some user data, or just true to indicate success
      return data;
    } catch (error) {
      console.error('AuthService register error:', error);
      throw error;
    }
  };
