
import { AuthProvider as AuthKitProvider } from 'react-auth-kit';

export const authConfig = {
  authType: 'cookie', // or 'localstorage' based on your preference
  authName: 'auth', // Cookie or localStorage key
  cookieDomain: window.location.hostname,
  cookieSecure: false, // set to true if using https
  tokenName: 'token', // The name of the token in cookies/localStorage
  tokenExpireTime: 3600, // Token expiry time in seconds
};
