import React from 'react'
import { useSelector } from 'react-redux'
import CommentForm from './CommentForm.js'
import { useRouteMatch } from 'react-router-dom'
import {
  Typography,
  List,
  ListItem
} from '@material-ui/core'

const CommentList = () => {
  const blogs = useSelector(state => state.blogs)
  const comments = useSelector(state => state.comments)

  const match = useRouteMatch('/blogs/:id')

  const blog = match
    ? blogs.find(blog => String(blog.id) === String(match.params.id))
    : null

  const blog_comments = comments.filter(comment => String(comment.blog) === String(blog.id))

  return (
    <div id='comment-list'>
      <Typography variant='h4' component='h4'>comments</Typography>
      <CommentForm />
      <List>
        {blog_comments.map(blog_comment =>
          <ListItem key={blog_comment.id}>{blog_comment.content}</ListItem>)}
      </List>
    </div>
  )
}

export default CommentList