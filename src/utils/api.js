// Base API utility — replace BASE_URL with your backend

const BASE_URL = 'https://your-api.example.com/api'; // TODO: ganti dengan URL API

const defaultHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

export const api = {
  get: async (endpoint, token = null) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: defaultHeaders(token),
    });
    return handleResponse(res);
  },

  post: async (endpoint, body, token = null) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: defaultHeaders(token),
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  put: async (endpoint, body, token = null) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: defaultHeaders(token),
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  delete: async (endpoint, token = null) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: defaultHeaders(token),
    });
    return handleResponse(res);
  },
};

export default api;
