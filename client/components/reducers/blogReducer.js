const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data).sort(compareLikes)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id).sort(compareLikes)
  case 'LIKE_BLOG':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data).sort(compareLikes)
  case 'INIT_BLOGS':
    return action.data.sort(compareLikes)
  default:
    return state.sort(compareLikes)
  }
}

const compareLikes = (currBlog, nextBlog) => {
  return nextBlog.likes - currBlog.likes
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs,
  }
}

export const createBlog = (blog) => {
  return {
    type: 'NEW_BLOG',
    data: blog
  }
}

export const likeBlog = (blog) => {
  return {
    type: 'LIKE_BLOG',
    data: blog
  }
}

export const removeBlog = (blog) => {
  return {
    type: 'REMOVE_BLOG',
    data: blog
  }
}

export default blogReducer