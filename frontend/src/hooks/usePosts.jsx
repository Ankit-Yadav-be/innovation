import { useEffect, useState } from 'react';
import * as postApi from '../api/postApi';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    try {
      const { data } = await postApi.fetchPosts();
      setPosts(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const initPosts = async () => {
    setLoading(true);
    try {
      //  STEP 1: fetch & save
      await postApi.fetchAndSavePosts();

      //  STEP 2: get posts
      await getPosts();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const search = async (query) => {
    if (!query) return getPosts();

    try {
      const { data } = await postApi.searchPosts(query);
      setPosts(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    initPosts();
  }, []);

  return { posts, loading, search };
};