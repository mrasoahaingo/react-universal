import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import liveApp from '../src/reducers'
import AppContainer from '../src/containers/App'

const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

app.use('/public', express.static('public'))

// This is fired every time the server side receives a request
app.use((req, res) => {
  // Create a new Redux store instance
  const store = createStore(liveApp, { count: 0 })

  // Render the component to a string
  const html = renderToString(
      <Provider store={store}>
        <AppContainer />
      </Provider>
  )

  // Grab the initial state from our Redux store
  const initialState = store.getState()

  // Send the rendered page back to the client
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