import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import createStore from 'shared/store/createStore'
import routes from 'shared/routes'

import config from '../../src/shared/configs';
const wdsPath = `http://${config.host}:${config.wdsPort}/build/`;
const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);

const renderPage = (reactComponent) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>ReactJS Bangkok - Universal Web Apps</title>
      ${process.env.NODE_ENV === 'production' ? '<link rel="stylesheet" href="' + assetsManifest.app.css + '" />' : ''}
    </head>
    <body>
      <div id="root">${reactComponent}</div>
      ${process.env.NODE_ENV === 'production' ?
        `
          <script src="${assetsManifest.vendor.js}"></script>
          <script src="${assetsManifest.app.js}"></script>
        `
        : `<script src="${wdsPath + 'main.js'}"></script>`
      }
    </body>
  </html>
`)

export default function(req, res) {
  const store = createStore()
  match({
    location: req.url,
    routes
  }, (error, redirectLocation, renderProps) => {
    if (renderProps) {
      const reactComponent = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )
      res.end(renderPage(reactComponent));
    } else {
      res.status(400).send('Not Found')
    }
  })
}