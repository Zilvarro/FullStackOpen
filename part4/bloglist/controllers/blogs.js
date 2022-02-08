const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

console.log("Router init")
blogsRouter.get('/', async (request, response) => {
  blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = new Blog(request.body)

  result = await Blog.findByIdAndUpdate(request.params.id, {likes: blog.likes}, {new: true})
  response.status(200).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter