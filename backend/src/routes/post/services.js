import axios from 'axios';
import * as postQuery from './query.js';

// Fetch from external API & store
export const fetchAndSavePosts = async () => {
  const count = await postQuery.countPosts();

  if (count > 0) {
    return { message: 'Posts already exist' };
  }

  const { data } = await axios.get('https://dev.to/api/articles');

  const formattedPosts = data.map((item) => ({
    title: item.title,
    description: item.description,
    coverImage: item.cover_image,
    url: item.url,
    tags: item.tag_list,
    authorName: item.user?.name,
    authorImage: item.user?.profile_image,
  }));

  await postQuery.insertPosts(formattedPosts);

  return formattedPosts;
};

// Pagination posts
export const getPosts = async (page, limit) => {
  return postQuery.getAllPosts(page, limit);
};

// Single post
export const getSinglePost = async (id) => {
  const post = await postQuery.getPostById(id);
  if (!post) throw new Error('Post not found');
  return post;
};

// Search (NO pagination)
export const searchPostsService = async (query) => {
  if (!query) return [];
  return postQuery.searchPosts(query);
};