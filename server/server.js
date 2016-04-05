import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createClient from 'common/createClient'
import createStore, { initialState } from 'common/createStore'
import { createServerResolver } from 'common/reasync'
import createRoutes from 'routes'

const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

app.use('/public', express.static('public'))

app.use((req, res) => {

  const memoryHistory = createMemoryHistory(req.originalUrl)
  const client = createClient(req.cookie)
  const store = createStore(memoryHistory, initialState, client)
  const history = syncHistoryWithStore(memoryHistory, store)
  const location = history.createLocation(req.url)
  const routes = createRoutes(history)

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      res.status(500).send(error.message)
    } else if (renderProps == null) {
      res.status(404).send('Not found')
    } else {

      const render = (renderProps, store) => {
        const html = renderToString(
            <Provider store={store} key="provider">
              <RouterContext {...renderProps} />
            </Provider>
        );

        return res.send(`
          <!doctype html>
          <html lang="en" data-framework="preact">
          <head>
              <meta charset="utf-8"/>
              <link rel="stylesheet" href="/public/css/main.css"/>
          </head>
          <body class="demo">
              <div id="app">${html}</div>
              <script>
                  window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}
              </script>
              <script src="/dist/bundle.js"></script>
          </body>
          </html>
        `)
      }

      const attrs = {
        location: renderProps.location,
        params: renderProps.params,
        getState: store.getState,
        dispatch: store.dispatch
      };

      return createServerResolver().triggerHooks(renderProps.components, attrs, render.bind(null, renderProps, store))
    }
  })
})

app.listen(3000, (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3000')
})