const Category = require('../model/category');
const Post = require('../model/post');

// Category helpers
const getAllCategories = async () => {
  return await Category.find();
};

const getCategoryById = async (id) => {
  return await Category.findById(id);
};

const getCategoryBySlug = async (slug) => {
  return await Category.findOne({ Slug: slug });
};

const createCategory = async (categoryData) => {
  const category = new Category(categoryData);
  return await category.save();
};

const updateCategory = async (id, updateData) => {
  return await Category.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

// Post helpers
const getAllPosts = async () => {
  return await Post.find().populate('Category');
};

const getPostById = async (id) => {
  return await Post.findById(id).populate('Category');
};

const getPostsByCategory = async (categoryId) => {
  return await Post.find({ Category: categoryId }).populate('Category');
};

const createPost = async (postData) => {
  const post = new Post(postData);
  return await post.save();
};

const updatePost = async (id, updateData) => {
  return await Post.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePost = async (id) => {
  return await Post.findByIdAndDelete(id);
};

const searchPosts = async (query) => {
  return await Post.find({
    $or: [
      { Name: { $regex: query, $options: 'i' } },
      { About: { $regex: query, $options: 'i' } }
    ]
  }).populate('Category');
};

// Bulk operations
const clearAllData = async () => {
  await Category.deleteMany({});
  await Post.deleteMany({});
};

const seedCategories = async (categories) => {
  return await Category.insertMany(categories);
};

const seedPosts = async (posts) => {
  return await Post.insertMany(posts);
};

module.exports = {
  // Category helpers
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  // Post helpers
  getAllPosts,
  getPostById,
  getPostsByCategory,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
  // Bulk operations
  clearAllData,
  seedCategories,
  seedPosts
};
