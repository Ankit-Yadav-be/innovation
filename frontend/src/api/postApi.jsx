import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const fetchPosts = (page = 1, limit = 9) =>
  API.get(`/api/posts?page=${page}&limit=${limit}`);

export const fetchAndSavePosts = () => API.get('/api/posts/fetch');

export const fetchSinglePost = (id) =>
  API.get(`/api/posts/${id}`);

export const searchPosts = (query) =>
  API.get(`/api/posts/search?q=${query}`);