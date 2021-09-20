import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import {
  Typography,
  List,
  ListItem
} from '@material-ui/core'

const User = () => {
  const users = useSelector(state => state.users)
  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => String(user.id) === String(match.params.id))
    : null

  if (!user) {
    return null
  }

  return (
    <div>
      <Typography variant='h3' component='h3'>{user.name}</Typography>
      <Typography variant='h4' component='h4'>added blogs</Typography>
      <List>
        {user.blogs.map(blog => <ListItem key={blog.id}>{blog.title}</ListItem>)}
      </List>
    </div>
  )
}

export default User