const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeAll(async () => {
  // create a test user generate a token
  await helper.createTestUser()
})

beforeEach(async () => {
  await Blog.deleteMany({})
  // give the blogs to the test user
  const testUser = await User.findOne({ username: 'test_user' })

  const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog, user: testUser }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('the correct number of blog posts are returned in JSON format', async () => {
  const response = await api.get('/blogs')
    .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier propery of blog posts is named id', async () => {
  const response = await api.get('/blogs')
  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('posting a single blog post works', async () => {
  const login = await api
    .post('/login')
    .send({ username: 'test_user', password: 'password' })

  const token = login.body.token

  const newBlog = {
    title: 'test post please ignore',
    author: 'mister rogers',
    url: 'www.reddit.com',
    likes: 69,
  }

  await api
    .post('/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain('test post please ignore')
})

test('a blog missing the likes property defaults the property to 0', async () => {
  const login = await api
    .post('/login')
    .send({ username: 'test_user', password: 'password' })

  const token = login.body.token

  const newBlog = {
    title: 'test post please ignore',
    author: 'mister rogers',
    url: 'www.reddit.com',
  }

  const response = await api
    .post('/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('if a blog post is missing the title and url properties, the api will return status code 400', async () => {
  const login = await api
    .post('/login')
    .send({ username: 'test_user', password: 'password' })

  const token = login.body.token

  const newBlog = {
    author: 'mister rogers',
  }

  await api
    .post('/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('deleting a blog post returns status 204 if the id is valid', async () => {
  const login = await api
    .post('/login')
    .send({ username: 'test_user', password: 'password' })

  const token = login.body.token

  const initialBlogs = await helper.blogsInDb()
  const blogToDelete = initialBlogs[0]

  await api
    .delete(`/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)

  const endBlogs = await helper.blogsInDb()

  expect(endBlogs).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = endBlogs.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('updating a blog post returns status 201 and the new content is saved', async () => {
  // fixing this test requires the test user, even though this method doesn't use authentication
  const testUser = await User.findOne({ username: 'test_user' })

  const initialBlogs = await helper.blogsInDb()
  const blogToUpdate = initialBlogs[0]

  const newBlog = {
    title: 'test post please ignore',
    author: 'mister rogers',
    url: 'www.reddit.com',
    likes: 69,
    id: blogToUpdate.id,
    user: {
      id: testUser.id,
      name: testUser.name,
      username: testUser.username
    },
    comments: []
  }

  const response = await api
    .put(`/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect([response.body]).toContainEqual(newBlog)
})

test('adding a blog fails with status code 401 Unauthorized if a token is not provided', async () => {
  const newBlog = {
    title: 'test post please ignore',
    author: 'mister rogers',
    url: 'www.reddit.com',
    likes: 69,
  }

  await api
    .post('/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
  expect(titles).not.toContain('test post please ignore')
})

afterAll(async () => {
  await mongoose.connection.close()
})