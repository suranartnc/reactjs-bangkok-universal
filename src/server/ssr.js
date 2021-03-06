import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import Helmet from 'react-helmet'
import { Provider } from 'react-redux'
import createStore from 'shared/store/createStore'
import routes from 'shared/routes'
import prefetchData from './prefetchData'

import config from '../../src/shared/configs';
const wdsPath = `http://${config.host}:${config.wdsPort}/build/`;
const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);

const renderPage = (reactComponent, initialState) => {
  let head = Helmet.rewind()
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${head.title.toString()}
        ${process.env.NODE_ENV === 'production' ? '<link rel="stylesheet" href="' + assetsManifest.app.css + '" />' : ''}
      </head>
      <body>
        <div id="root">${reactComponent}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        ${process.env.NODE_ENV === 'production' ?
          `
            <script src="${assetsManifest.vendor.js}"></script>
            <script src="${assetsManifest.app.js}"></script>
          `
          : `<script src="${wdsPath + 'main.js'}"></script>`
        }
      </body>
    </html>
  `
}

export default function(req, res) {
  const store = createStore()
  match({
    location: req.url,
    routes
  }, (error, redirectLocation, renderProps) => {
    if (renderProps) {
      prefetchData(store.dispatch, renderProps.components, renderProps.params)
        .then(() => {
          const initialState = store.getState()
          const reactComponent = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          )
          res.end(renderPage(reactComponent, initialState));
        })
    } else {
      res.status(400).send('Not Found')
    }
  })
}