import { combineReducers } from 'redux';

import postLatestReducer from './postLatestReducer';
import postActiveReducer from './postActiveReducer';

const postReducer = combineReducers({
  latest: postLatestReducer,
  active: postActiveReducer
});

export default postReducer;