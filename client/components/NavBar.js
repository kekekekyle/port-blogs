import React from 'react'
import { Link } from 'react-router-dom'
import LogoutForm from './LogoutForm'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button
} from '@material-ui/core'

const NavBar = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'>
        </IconButton>
        <Button color='inherit' component={Link} to='/'>
          blogs
        </Button>
        <Button color='inherit' component={Link} to='/users'>
          users
        </Button>
        <LogoutForm />
      </Toolbar>
    </AppBar>
  )
  /* return (
    <div id='nav-bar'>
      <Link to='/'>blogs</Link>
      <Link to='/users'>users</Link>
      <LogoutForm />
    </div>
  ) */
}

export default NavBar