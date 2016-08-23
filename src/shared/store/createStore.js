import { createStore, applyMiddleware } from 'redux';

import apiMiddleware from 'shared/middlewares/apiMiddleware';
import rootReducer from 'shared/reducer';

export default (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(apiMiddleware)
  )
  return store;
}
