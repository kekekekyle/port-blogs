import React, { useEffect, useRef } from 'react'
import CreateBlogForm from './components/CreateBlogForm'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import userService from './services/users'
import Notification from './components/Notification'
import NavBar from './components/NavBar'
import Users from './components/Users'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './components/reducers/blogReducer'
import { initializeUsers } from './components/reducers/userReducer'
import { loginUser } from './components/reducers/loginReducer'
import { Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import {
  Typography
} from '@material-ui/core'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)

  useEffect(() => {
    blogService
      .getAll().then(blogs => dispatch(initializeBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    userService
      .getAll().then(users => dispatch(initializeUsers(users)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <Container>
      <div>
        {login === null
          ? <div>
            <Notification />
            <LoginForm />
          </div>
          : <div>
            <NavBar />
            <Typography variant='h2' component='h2'>blogs</Typography>
            <Notification />
            <Switch>
              <Route path='/blogs/:id'>
                <Blog />
              </Route>
              <Route path='/users/:id'>
                <User />
              </Route>
              <Route path='/users'>
                <Users />
              </Route>
              <Route path='/'>
                <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                  <CreateBlogForm
                    blogFormRef={blogFormRef} />
                </Togglable>
                <BlogList />
              </Route>
            </Switch>
          </div>
        }
      </div>
    </Container>
  )
}

export default App