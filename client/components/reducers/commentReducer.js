const commentReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_COMMENT':
    return state.concat(action.data)
  default:
    return state
  }
}

export const createComment = (comment) => {
  return {
    type: 'NEW_COMMENT',
    data: comment
  }
}

export default commentReducer