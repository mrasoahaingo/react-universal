import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import liveApp from '../common/reducers'

import AppContainer from '../common/containers/App'

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__ || { count: 0 }

const store = createStore(liveApp, initialState)

render(
    <Provider store={store}>
      <AppContainer />
    </Provider>
    , document.getElementById('app'))