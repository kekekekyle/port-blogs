import React from 'react'
import loginService from '../services/login'
import { loginUser } from './reducers/loginReducer'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import {
  Typography,
  TextField,
  Button
} from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value
      })
      window.localStorage.setItem(
        'loggedBlogsUser', JSON.stringify(user)
      )
      dispatch(loginUser(user))
      dispatch(setNotification(`Successfully logged in as ${user.username}`, 'success', 3))
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 'error', 3))
    }
  }

  return (
    <div>
      <Typography variant='h2' component='h2'>Login</Typography>

      <form onSubmit={handleLogin}>
        <div>
          <TextField id='username' label='username' />
        </div>
        <div>
          <TextField id='password' label='password' type='password' />
        </div>
        <div>
          <Button id='login-button' variant='contained' color='primary' type='submit'>
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm