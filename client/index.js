import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { Router, browserHistory, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createClient from 'common/createClient'
import createStore from 'common/createStore'
import createRoutes from 'routes'
import { createClientResolver } from 'common/reasync'

const state = window.__INITIAL_STATE__

const client = createClient() 
const store = createStore(browserHistory, state, client)
const history = syncHistoryWithStore(browserHistory, store)
const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`
const routes = createRoutes(history)

const attrs = { getState: store.getState, dispatch: store.dispatch }
const resolver = createClientResolver(history, routes, location, attrs)

if(!state) {
  resolver.forceTrigger()
}

match({ routes, history, location }, () => {
  render(
      <Provider store={store}>
        {routes}
      </Provider>
      , document.getElementById('app')
  )
})