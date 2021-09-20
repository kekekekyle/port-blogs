import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { createBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import {
  Typography,
  TextField,
  Button
} from '@material-ui/core'

const CreateBlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)

  const addBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    try {
      blogFormRef.current.toggleVisibility()

      const newBlog = await blogService.create({
        title: title,
        author: author,
        url: url
      })
      // need to manually append username for now ...
      newBlog['user'] = {
        id: newBlog.user,
        username: login.username
      }
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`Successfully created blog ${newBlog.title}`, 'success', 3))
    } catch (exception) {
      dispatch(setNotification(`Failed to create blog ${title}`, 'error', 3))
    }
  }

  return (
    <div className='createBlogDiv'>
      <form onSubmit={addBlog}>
        <div>
          <Typography variant='h4' component='h4'>create new</Typography>
          <TextField label='title' name='title' id='create-blog-title' />
          <TextField label='author' name='author' id='create-blog-author' />
          <TextField label='url' name='url' id='create-blog-url' />
          <Button id='create-blog-button' type='submit'>create</Button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlogForm