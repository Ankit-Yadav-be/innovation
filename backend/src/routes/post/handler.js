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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;

    const data = await postService.getPosts(page, limit);

    res.json({
      success: true,
      ...data,
    });
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