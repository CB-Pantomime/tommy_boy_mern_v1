
const express = require('express')
const {
  getBlogs, 
  getBlog, 
  createBlog, 
  deleteBlog, 
  updateBlog
} = require('../controllers/blogController')

const router = express.Router()

// GET all workouts
router.get('/', getBlogs)

// GET a single workout
router.get('/:id', getBlog)

// POST a new workout
router.post('/', createBlog)

// DELETE a workout
router.delete('/:id', deleteBlog)

// UPDATE a workout
router.patch('/:id', updateBlog)

module.exports = router