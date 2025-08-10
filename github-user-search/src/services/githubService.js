// src/services/githubService.js
import axios from 'axios';

const BASE_URL = 'https://api.github.com/users';

export async function fetchUserData(username) {
  try {
    const token = import.meta.env.VITE_APP_GITHUB_API_KEY; // optional
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const { data } = await axios.get(`${BASE_URL}/${username}`, { headers });
    return data;
  } catch (err) {
    // normalize error so caller only needs to check thrown state
    throw err;
  }
}
