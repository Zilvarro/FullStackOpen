const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [  
  {
    "title": "mytitle1",
    "author": "myauthor1",
    "url": "myurl1",
    "likes": 1
  },
  {
    "title": "mytitle2",
    "author": "myauthor2",
    "url": "myurl2",
    "likes": 2
  },
]
  
beforeEach(async () => {  
  await Blog.deleteMany({})  
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()  
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 60000)

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)
  expect(contents).toContainEqual( 'mytitle2' )
})

test('blogs have the id property', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('notes can be created', async () => {
  const newBlog = {
    "title": "newtitle",
    "author": "newauthor",
    "url": "newurl",
    "likes": 3
  }

  //response from post should be single object
  const post_response = await api.post('/api/blogs').send(newBlog).expect(201)
  expect(post_response.body.title).toBe( 'newtitle' )

  //response from subsequent get should contain new object
  const get_response = await api.get('/api/blogs')
  expect(get_response.body).toHaveLength(initialBlogs.length + 1)
  const contents = get_response.body.map(r => r.title)
  expect(contents).toContainEqual( 'newtitle' )
})

test('likes default to 0 for new blogs', async () => {
  const newBlog = {
    "title": "newtitle",
    "author": "newauthor",
    "url": "newurl",
  }

  const post_response = await api.post('/api/blogs').send(newBlog)
  expect(post_response.body.title).toBe( 'newtitle' )
  expect(post_response.body.likes).toBe(0)
})

test('missing title leads to bad request', async () => {
  const newBlog = {
    "author": "newauthor",
    "url": "newurl",
  }

  const post_response = await api.post('/api/blogs').send(newBlog).expect(400)
})

test('missing url leads to bad request', async () => {
  const newBlog = {
    "title": "newtitle",
    "author": "newauthor",
  }

  const post_response = await api.post('/api/blogs').send(newBlog).expect(400)
})

afterAll( () => {
  mongoose.connection.close()
})