const { default: mongoose } = require("mongoose");
const Post = require("../models/postModel");
const { default: slugify } = require("slugify");

//create Post
const createPost = async (req, res) => {
  try {
    const { title, markdownContent, categories, author } = req.body;
    if (!title || !markdownContent) {
      return res
        .status(400)
        .json({ message: "Please provide a title and content for the post." });
    }
    const newPost = await Post.create({
      title,
      markdownContent,
      categories,
      author,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "error creating post", error: error.message });
  }
};

//get All Posts
const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default to 10 posts per page.

    // This is the core formula for pagination.
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};
//getPost By slug
const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return (
        res.status(400),
        json({
          message: `invalid post id ${req.params.id}`,
        })
      );
    }
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
  }
};

//updatePost by Id
const updatePost = async (req, res) => {
  try {
    const { title, markdownContent, categories } = req.body;
    const updatedData = {
      title,
      markdownContent,
      categories, // Add the categories to the update payload
    };

    //optional
    if (title) {
      updatedData.slug = slugify(title, { lower: true, strict: true });
    }
    // const updatePost = await Post.findByIdAndUpdate(req.params.id, updatedData, {
    const updatePost = await Post.findOneAndUpdate(// changes
      { slug: req.params.slug },
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (updatePost) {
      res.status(200).json(updatePost);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ message: `Invalid post ID format: ${req.params.id}` });
    }
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", error: error.message });
    }
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
};

//delete Post

const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (deletedPost) {
      res.status(200).json({ message: "post deleted successfully" });
    } else {
      res.status(400).json({ message: "post not found" });
    }
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ message: `Invalid post ID format: ${req.params.id}` });
    }
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
};

//getPostsByCategory
const  getPostsByCategory =async(req,res)=>{
  try {
    const  categoryName = req.params.categoryName 
    const posts  = await Post.find({categories:categoryName}).sort({createdAt:-1})
        res.status(200).json(posts);

  } catch (error) {
        res.status(500).json({ message: 'Error fetching posts by category', error: error.message });

  }

}

module.exports = {
  createPost,
  getAllPosts,
  getPostBySlug,
  updatePost,
  deletePost,
  getPostsByCategory
};
//
