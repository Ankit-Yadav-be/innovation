import Post from '../../schema/PostModel.js';

// Count posts
export const countPosts = async () => {
  return await Post.countDocuments();
};

// Insert posts
export const insertPosts = async (posts) => {
  return await Post.insertMany(posts);
};

// Get all posts (pagination)
export const getAllPosts = async (page = 1, limit = 9) => {
  const skip = (page - 1) * limit;

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Post.countDocuments();

  return {
    posts,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

// Get single post
export const getPostById = async (id) => {
  return await Post.findById(id).lean();
};

// Search posts (NO pagination)
export const searchPosts = async (query) => {
  if (!query) return [];

  return await Post.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
    ],
  })
    .sort({ createdAt: -1 })
    .lean();
};