
const Blog = require('../models/blogModel')
const mongoose = require('mongoose')

// get all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({createdAt: -1})

  res.status(200).json(blogs)
}

// get a single blog
const getBlog = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Mongoose ObID No such blog'})
  }

  const blog = await Blog.findById(id)

  if (!blog) {
    return res.status(404).json({error: 'Collection findById No such blog'})
  }

  res.status(200).json({
    msg: 'get single workout',
    data: blog
  })
}

// create a new blog
const createBlog = async (req, res) => {
  const {title, words, image} = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!words) {
    emptyFields.push('load')
  }
  if (!image) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const blog = await Blog.create({ title, words, image })
    res.status(200).json({
      success: true,
      data: blog
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

// delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'Mongoose ObID No such blog'})
  }

  const blog = await Blog.findOneAndDelete({_id: id})

  if(!blog) {
    return res.status(400).json({error: 'Collection findById No such blog'})
  }

  res.status(202).json({
    success: true,
    data: blog
  })
}

// update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const blog = await Blog.findOneAndUpdate(
    {
    _id: id
    }, 
    {
    ...req.body
    },  
    {
    new: true,
    // read about runValidators
    runValidators: true
    });

  if (!blog) {
    return res.status(400).json({error: 'No such blog'})
  }

  res.status(201).json({
    success: true,
    data: blog
  })
}

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog
}