const notificationReducer = (state = { message: '', messageType: null }, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return { message: action.data.message, messageType: action.data.messageType }
  case 'CLEAR_NOTIFICATION':
    return { message: '', messageType: null }
  default:
    return state
  }
}

let timeoutId

export const setNotification = (message, messageType, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: message,
        messageType: messageType
      }
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, time * 1000)
  }
}

export const clearNotification = () => (
  { type: 'CLEAR_NOTIFICATION' }
)

export default notificationReducer