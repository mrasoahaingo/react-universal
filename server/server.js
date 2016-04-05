import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, Router, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createStore from '../common/createStore'
import routes from '../src/routes'

const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

app.use('/public', express.static('public'))

app.use((req, res) => {

  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = createStore(memoryHistory, undefined);
  const history = syncHistoryWithStore(memoryHistory, store);
  
  const html = renderToString(
      <Provider store={store} key="provider">
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
  )

  const initialState = store.getState()

  res.send(`
    <!doctype html>
    <html lang="en" data-framework="preact">
    <head>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="css/main.css"/>
    </head>
    <body class="demo">
        <div id="app">${html}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/dist/bundle.js"></script>
    </body>
    </html>
  `)
})

app.listen(3000, (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3000')
})