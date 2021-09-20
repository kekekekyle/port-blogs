import React from 'react'
import { useSelector } from 'react-redux'
import {
  Alert
} from '@material-ui/lab'

const Notification = () => {
  const message = useSelector(state => state.notifications)

  return (
    <div>
      {(message.message &&
        <Alert severity={message.messageType}>
          {message.message}
        </Alert>
      )}
    </div>
  )
}

export default Notification