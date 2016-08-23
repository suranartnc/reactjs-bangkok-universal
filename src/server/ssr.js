import config from '../../src/shared/configs';
const wdsPath = `http://${config.host}:${config.wdsPort}/build/`;
const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);

const renderPage = () => (`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>ReactJS Bangkok - Universal Web Apps</title>
      ${process.env.NODE_ENV === 'production' ? '<link rel="stylesheet" href="' + assetsManifest.app.css + '" />' : ''}
    </head>
    <body>
      <div id="root"></div>
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
  res.end(renderPage());
}