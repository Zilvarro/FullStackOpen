const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}
  
const totalLikes = (blogs) => {
  return blogs.reduce((likes,blog)=>(likes + blog.likes), 0)
}
  
const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog)=>(favorite && favorite.likes >= blog.likes ? favorite : blog), null)
}

const mostBlogs = (blogs) => {
  const authors = _.groupBy(blogs,(blog)=>blog.author)
  var most = null
  for (var prop in authors) {
    if (!authors.hasOwnProperty(prop)) {continue}
    const blogCount = authors[prop].length
    if (!most || blogCount > most.blogs) {
      most = {
        author: prop,
        blogs: blogCount
      }
    }
  }

  return most;
}

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs,(blog)=>blog.author)
  var most = null
  for (var prop in authors) {
    if (!authors.hasOwnProperty(prop)) {continue}
    var likeCount = _.sumBy(authors[prop], (blog)=>blog.likes)
    if (!most || likeCount > most.likes) {
      most = {
        author: prop,
        likes: likeCount
      }
    }
  }
  return most;
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}