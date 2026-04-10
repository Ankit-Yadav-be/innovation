import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    coverImage: {
      type: String,
    },

    url: {
      type: String,
    },

    tags: [String],

    authorName: {
      type: String,
    },

    authorImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);