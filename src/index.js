import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import liveApp from './reducers'

import AppContainer from './containers/App'

const store = createStore(liveApp, { count: 0 })

render(
    <Provider store={store}>
      <AppContainer />
    </Provider>
    , document.getElementById('app'))