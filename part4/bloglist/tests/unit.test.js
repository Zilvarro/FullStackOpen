const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('totalLikes', () => {
  test('empty array returns 0 likes', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('single blog returns its likes', () => {
    const blogs = [{likes: 5}]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(5)
  })
  
  test('multiple blog returns sum of likes', () => {
    const blogs = [{likes: 1},{likes: 2},{likes: 3},{likes: 4}]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(10)
  })
})

describe('favoriteBlog', () => {
  test('empty array returns null', () => {
    const blogs = []
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(null)
  })

  test('single blog is returned', () => {
    const blog1 = {likes: 5}
    const blogs = [blog1]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blog1)
  })
  
  test('multiple blogs returns the one with most likes', () => {
    const blog1 = {likes: 5}
    const blog2 = {likes: 7}
    const blog3 = {likes: 3}
    const blogs = [blog1,blog2,blog3]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blog2)
  })
})

describe('mostBlogs', () => {
  test('empty array returns null', () => {
    const blogs = []
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(null)
  })

  test('single blog returns its author and 1', () => {
    const blog1 = {author: "a"}
    const blogs = [blog1]
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({author: "a", blogs: 1})
  })
  
  test('multiple blogs returns the author with most blogs', () => {
    const blog1 = {author: "a"}
    const blog2 = {author: "b"}
    const blog3 = {author: "b"}
    const blog4 = {author: "c"}
    const blogs = [blog1,blog2,blog3]
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({author: "b", blogs: 2})
  })
})

describe('mostLikes', () => {
  // test('empty array returns null', () => {
  //   const blogs = []
  //   const result = listHelper.mostBlogs(blogs)
  //   expect(result).toEqual(null)
  // })

  // test('single blog returns its author and likes', () => {
  //   const blog1 = {author: "a",likes: 3}
  //   const blogs = [blog1]
  //   const result = listHelper.mostLikes(blogs)
  //   expect(result).toEqual({author: "a", likes: 3})
  // })
  
  test('multiple blogs returns the author with most likes', () => {
    const blog1 = {author: "a",likes:5}
    const blog2 = {author: "b",likes:3}
    const blog3 = {author: "a",likes:1}
    const blog4 = {author: "b",likes:4}
    const blogs = [blog1,blog2,blog3,blog4]
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({author: "b", likes: 7})
  })
})