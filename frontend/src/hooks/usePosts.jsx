import { useEffect, useState } from 'react';
import * as postApi from '../api/postApi';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');

  const getPosts = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const { data } = await postApi.fetchPosts(pageNumber);

      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

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

  const search = async (q, pageNumber = 1) => {
    setQuery(q);

    if (!q) return getPosts(pageNumber);

    setLoading(true);
    try {
      const { data } = await postApi.searchPosts(q, pageNumber);

      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const nextPage = () => {
    if (page < totalPages) {
      query ? search(query, page + 1) : getPosts(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      query ? search(query, page - 1) : getPosts(page - 1);
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
  };
};