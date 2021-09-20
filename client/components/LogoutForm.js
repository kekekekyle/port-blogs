import React from 'react'
import { logoutUser } from './reducers/loginReducer'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button
} from '@material-ui/core'

const LogoutForm = () => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogsUser')
    dispatch(logoutUser())
    dispatch(setNotification('Logged out', 'success', 3))
  }

  return (
    <form onSubmit={handleLogout}>
      logged in as {login.username} <Button type='submit'>logout</Button>
    </form>
  )
}

export default LogoutForm