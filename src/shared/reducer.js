import { combineReducers } from 'redux'

import postReducer from 'shared/modules/post/postReducer'

const rootReducer = combineReducers({
  post: postReducer
})

export default rootReducer