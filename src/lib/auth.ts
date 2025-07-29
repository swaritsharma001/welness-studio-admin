import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';

export const setAuthToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 }); // 7 days
};

export const getAuthToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeAuthToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Mock admin credentials for demo
export const loginAdmin = (username: string, password: string) => {
  /*if (username === 'admin' && password === 'admin123') {
    const token = 'admin_token_' + Date.now();
    setAuthToken(token);
    return { success: true, token };
  }
  return { success: false, error: 'Invalid credentials' };*/
};