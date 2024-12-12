const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const validation= require('../validations/validation')
const verifyToken = require('../verifyToken')

// Create a new post
router.post('/', verifyToken, async (req, res) => { 
  const { error } = validationPost(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })
  try {
    const { title, topic, body, expirationTime } = req.body
    const userId = req.user.id
    const newPost = new Post({
      title,
      topic,
      body,
      expirationTime: new Date(expirationTime),
      owner: userId,
    })

    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post', details: err.message })
  }
})
// Like or dislike a post
router.patch('/:postId/react', verifyToken, async (req, res) => { // Add verifyToken here
  const { error } = validateReaction(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  try {
    const { postId } = req.params
    const { reaction } = req.body
    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ error: 'Post not found' })

    if (reaction === 'like') {
      post.likes += 1
    } else if (reaction === 'dislike') {
      post.dislikes += 1
    }
    const updatedPost = await post.save()
    res.status(200).json(updatedPost)
  } catch (err) {
    res.status(500).json({ error: 'Failed to react to post', details: err.message })
  }
})
// Add a comment to a post
router.post('/:postId/comment', verifyToken, async (req, res) => {
  const { error } = validateComment(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  try {
    const { postId } = req.params
    const { content } = req.body
    const userId = req.user.id
    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ error: 'Post not found' })

    if (new Date() > new Date(post.expirationTime)) {
      return res.status(400).json({ error: 'Post has expired, comments are not allowed' })
    }
    const newComment = new Comment({
      postId,
      userId,
      content,
    })

    const savedComment = await newComment.save()
    post.comments.push(savedComment._id)
    await post.save()

    res.status(201).json(savedComment)
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment', details: err.message })
  }
})

module.exports = router

