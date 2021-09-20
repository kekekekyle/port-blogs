import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import blogService from '../services/blogs'
import { likeBlog, removeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { useHistory } from 'react-router-dom'
import CommentList from './CommentList'
import {
  Typography,
  Button
} from '@material-ui/core'

const Blog = () => {
  const login = useSelector(state => state.login)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const history = useHistory()

  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => String(blog.id) === String(match.params.id))
    : null

  if (!blog) {
    return null
  }

  const handleLike = async (event) => {
    event.preventDefault()

    const tempBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }

    try {
      const updatedBlog = await blogService.update(tempBlog)
      dispatch(likeBlog(updatedBlog))
      dispatch(setNotification(`Successfully liked blog ${updatedBlog.title}`, 'success', 3))
    } catch (exception) {
      dispatch(setNotification(`Failed to like blog ${blog.title}`, 'error', 3))
    }
  }

  const handleRemove = async () => {
    const tempBlog = {
      title: blog.title,
      id: blog.id
    }

    try {
      await blogService.remove(tempBlog)
      history.push('/')
      dispatch(removeBlog(tempBlog))
      dispatch(setNotification(`Successfully removed blog ${tempBlog.title}`, 'success', 3))
    } catch (exception) {
      dispatch(setNotification(`Failed to remove blog ${tempBlog.title}`, 'error', 3))
    }
  }

  return (
    <div>
      <div className='blog'>
        <Typography className='blog-title' variant='h4' component='h4'>{blog.title}</Typography>
        <Typography className='blog-author' variant='subtitle1' component='p'>author: {blog.author}</Typography>
        <Typography className='blog-url' variant='subtitle1' component='p'>url: <a href={blog.url}>{blog.url}</a></Typography>
        <Typography className='blog-likes' variant='subtitle1' component='p'>likes: {blog.likes}<Button className='like-button' onClick={handleLike}>like</Button></Typography>
        <Typography className='blog-user' variant='subtitle1' component='p'>user: {blog.user.username}</Typography>
        <Button
          style={blog.user.username === login.username ? { display: '' } : { display: 'none' }}
          onClick={handleRemove}>
          remove
        </Button>
      </div>
      <CommentList />
    </div>
  )
}

export default Blog