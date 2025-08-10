// src/services/github.js
import axios from 'axios';
const BASE_URL = 'https://api.github.com/users';

export const fetchGitHubUser = async (username) => {
  try {
    const token = import.meta.env.VITE_APP_GITHUB_API_KEY;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await axios.get(`${BASE_URL}/${username}`, { headers });
    return res.data;
  } catch (err) {
    throw err;
  }
};
