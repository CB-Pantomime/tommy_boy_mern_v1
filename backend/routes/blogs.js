
const express = require('express')
const {
  getBlogs, 
  // getBlog, 
  createBlog, 
  deleteBlog, 
  updateBlog
} = require('../controllers/blogController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// GET all blogs
router.get('/', getBlogs)

// **Stretch Feature In Future --> GET a single blog**   
// router.get('/:id', getBlog)

// Auth
router.use(requireAuth)

// POST a new blog
router.post('/', requireAuth, createBlog)

// DELETE a blog
router.delete('/:id', requireAuth, deleteBlog)

// UPDATE a blog
router.patch('/:id', requireAuth, updateBlog)

module.exports = router