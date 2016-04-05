import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { Router, browserHistory, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createStore from '../common/createStore'
import routes from '../src/routes'

const initialState = window.__INITIAL_STATE__ || { count: 0 }

const store = createStore(browserHistory, initialState)
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
      , document.getElementById('app'))

})