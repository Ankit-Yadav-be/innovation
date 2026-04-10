import { useEffect, useState } from 'react';
import * as postApi from '../api/postApi';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');

  //  GET POSTS (WITH PAGINATION)
  const getPosts = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const { data } = await postApi.fetchPosts(pageNumber);

      setPosts(data.posts || []);
      setTotalPages(data.totalPages || 1);
      setPage(data.page || 1);
      setQuery(''); // reset search
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // 🔹 INIT (fetch + save + load first page)
  const initPosts = async () => {
    setLoading(true);
    try {
      await postApi.fetchAndSavePosts();
      await getPosts(1);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // SEARCH (NO PAGINATION)
  const search = async (q) => {
    setQuery(q);

    if (!q) return getPosts(1); 

    setLoading(true);
    try {
      const { data } = await postApi.searchPosts(q);

      setPosts(data.data || []);
      setPage(1);
      setTotalPages(1);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  //  NEXT PAGE (ONLY IF NOT SEARCHING)
  const nextPage = () => {
    if (!query && page < totalPages) {
      getPosts(page + 1);
    }
  };

  //  PREV PAGE (ONLY IF NOT SEARCHING)
  const prevPage = () => {
    if (!query && page > 1) {
      getPosts(page - 1);
    }
  };

  useEffect(() => {
    initPosts();
  }, []);

  return {
    posts,
    loading,
    search,
    page,
    totalPages,
    nextPage,
    prevPage,
    isSearching: !!query,
  };
};