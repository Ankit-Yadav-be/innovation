import * as postService from './services.js';

export const fetchPosts = async (req, res, next) => {
  try {
    const data = await postService.fetchAndSavePosts();
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const data = await postService.getPosts();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const data = await postService.getSinglePost(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const searchPosts = async (req, res, next) => {
  try {
    const data = await postService.searchPostsService(req.query.q);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};