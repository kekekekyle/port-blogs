const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.map((blog) => blog.likes).reduce((total, currLikes) => total + currLikes)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((fav, blog) => fav.likes > blog.likes ? fav : blog)
}

const mostBlogs = (blogs) => {
  // find the blog with the most likes
  let blog = favoriteBlog(blogs)
  if (blog) {
    const author = blog.author
    // count the number of blogs by that author
    const numBlogs = blogs.reduce((total, b) => b.author === author ? total + 1 : total, 0 )
    return { author: author, blogs: numBlogs }
  } else {
    return { author: null, blogs: 0 }
  }
}

const mostLikes = (blogs) => {
  let blog = favoriteBlog(blogs)
  if (blog) {
    const author = blog.author
    const numLikes = blogs.reduce((total, b) => b.author === author? total + b.likes : total, 0)
    return { author: author, likes: numLikes }
  } else {
    return { author: null, likes: 0 }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}