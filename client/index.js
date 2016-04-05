import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { Router, browserHistory, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createClient from '../common/createClient'
import createStore, { initialState } from '../common/createStore'
import routes from '../src/routes'

const state = window.__INITIAL_STATE__ || initialState

const client = createClient() 
const store = createStore(browserHistory, state, client)
const history = syncHistoryWithStore(browserHistory, store)
const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

match({ routes, history, location }, () => {
  render(
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
      , document.getElementById('app')
  )
})