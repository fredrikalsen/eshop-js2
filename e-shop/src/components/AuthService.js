// AuthService.js

const TOKEN_KEY = 'authToken';

export const login = async (username, password) => {
  // Gör en förfrågan till din autentiserings-API för att få en token
  const response = await fetch('https://js2-ecommerce-api.vercel.app/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    const token = data.token;

    // Spara token i local storage
    localStorage.setItem(TOKEN_KEY, token);

    return token;
  } else {
    throw new Error('Login failed');
  }
};

export const logout = () => {
  // Ta bort token från local storage vid utloggning
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => {
  // Hämta token från local storage
  return localStorage.getItem(TOKEN_KEY);
};
