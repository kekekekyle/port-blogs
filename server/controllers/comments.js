const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment
    .find({})
    .populate('blog', { title: 1 })
  response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
  const content = request.body.content
  const blog = await Blog.findById(request.body.blog)

  const comment = new Comment({
    content: content,
    blog: blog._id
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.status(201).json(savedComment)
})

module.exports = commentsRouter