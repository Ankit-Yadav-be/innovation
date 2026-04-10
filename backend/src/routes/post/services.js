import axios from 'axios';
import * as postQuery from './query.js';


export const fetchAndSavePosts = async () => {
  const count = await postQuery.countPosts();

  if (count > 0) {
    console.log('Posts already exist');
    return;
  }

  const { data } = await axios.get('https://dev.to/api/articles');

  //  map data
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

export const getPosts = async (page, limit) => {
  return postQuery.getAllPosts(page, limit);
};

export const getSinglePost = async (id) => {
  const post = await postQuery.getPostById(id);
  if (!post) throw new Error('Post not found');
  return post;
};

export const searchPostsService = async (query) => {
  return postQuery.searchPosts(query);
};