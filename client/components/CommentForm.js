import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import commentService from '../services/comments'
import { createComment } from './reducers/commentReducer'
import { setNotification } from './reducers/notificationReducer'
import {
  TextField,
  Button
} from '@material-ui/core'

const CreateCommentForm = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => String(blog.id) === String(match.params.id))
    : null

  const addComment = async (event) => {
    event.preventDefault()

    const content = event.target.content.value

    try {
      const newComment = await commentService.create({
        content: content,
        blog: blog.id
      })
      dispatch(createComment(newComment))
      dispatch(setNotification(`Successfully created comment ${newComment.content}`, 'success', 3))
      event.target.content.value = ''
    } catch (exception) {
      dispatch(setNotification(`Failed to create comment ${content}`, 'error', 3))
    }
  }

  return (
    <div className='createCommentDiv'>
      <form onSubmit={addComment}>
        <div>
          <TextField id='create-comment-content' name='content' label='comment' />
          <Button id='create-comment-button' type='submit'>add comment</Button>
        </div>
      </form>
    </div>
  )
}

export default CreateCommentForm