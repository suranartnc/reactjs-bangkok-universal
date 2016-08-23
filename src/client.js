import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll/lib/useScroll';

import { Provider } from 'react-redux';

import createStore from 'shared/store/createStore';
import routes from 'shared/routes';

const initialState = window.__INITIAL_STATE__
const store = createStore(initialState);

render(
  <Provider store={store}>
    <Router 
      history={browserHistory}
      routes={routes}
      render={applyRouterMiddleware(useScroll())} />
  </Provider>,
  document.getElementById('root')
);