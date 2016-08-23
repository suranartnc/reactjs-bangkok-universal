import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'shared/containers/App/App';
import HomePage from 'shared/containers/HomePage/HomePage';
import EntryPage from 'shared/containers/EntryPage/EntryPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="post/:id" component={EntryPage} />
  </Route>
);