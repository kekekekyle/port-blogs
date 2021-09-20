const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN_USER':
    return action.data
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }
}

export const loginUser = (login) => {
  return {
    type: 'LOGIN_USER',
    data: login,
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  }
}

export default loginReducer