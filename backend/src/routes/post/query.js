import Post from '../../schema/PostModel.js';

//  Count Posts (fix for your error)
export const countPosts = async () => {
  return await Post.countDocuments();
};

//  Insert Posts
export const insertPosts = async (posts) => {
  return await Post.insertMany(posts);
};

//  Get All Posts (latest first)
export const getAllPosts = async () => {
  return await Post.find()
    .sort({ createdAt: -1 }) // latest first
    .lean(); // performance boost
};

//  Get Single Post
export const getPostById = async (id) => {
  return await Post.findById(id).lean();
};

//  Search Posts (title + description)
export const searchPosts = async (query) => {
  return await Post.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
    ],
  })
    .sort({ createdAt: -1 })
    .lean();
};