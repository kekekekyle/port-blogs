import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './components/reducers/notificationReducer'
import blogReducer from './components/reducers/blogReducer'
import loginReducer from './components/reducers/loginReducer'
import userReducer from './components/reducers/userReducer'
import commentReducer from './components/reducers/commentReducer'

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  comments: commentReducer,
  login: loginReducer,
  users: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store