import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { Router, browserHistory, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createStore from 'common/createStore'
import createRoutes from 'routes'
import { createClientResolver } from 'common/reasync'

import StoreWorker from 'worker!./ww'
const webWorker = new StoreWorker()

//import registerServiceWorker from 'serviceworker!./sw'
//const sericeWorker = registerServiceWorker({ scope: '/' })

const state = window.__INITIAL_STATE__

const store = createStore(browserHistory, state, webWorker)
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