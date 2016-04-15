import 'isomorphic-fetch'

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { Router, browserHistory, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createBrowserStore from './store/browserStore'
import createRoutes from 'routes'
import { createClientResolver } from 'utils/reasync'

import WebWorker from 'worker!./workers/webWorker'
const webWorker = new WebWorker()

//import registerServiceWorker from 'serviceworker!./sw'
//const sericeWorker = registerServiceWorker({ scope: '/' })

const state = window.__INITIAL_STATE__

const store = createBrowserStore(browserHistory, state, webWorker)
const history = syncHistoryWithStore(browserHistory, store)
const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`
const routes = createRoutes(history)

const attrs = { getState: store.getState, dispatch: store.dispatch }
const resolver = createClientResolver(history, routes, location, attrs)

if(!state) {
  resolver.forceTrigger()
}

webWorker.addEventListener('message', msg => {
  store.dispatch({data: msg.data, type: 'UPDATE_STATE'})
})

match({ routes, history, location }, () => {
  render(
      <Provider store={store}>
        {routes}
      </Provider>
      , document.getElementById('app')
  )
})