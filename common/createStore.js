import { createStore as _createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import liveApp from '../src/reducers'

export default function (history, data = undefined) {
  const reducer = combineReducers({
    ...liveApp,
    routing: routerReducer
  })

  const store = _createStore(
      reducer,
      data,
      compose(
          applyMiddleware(
              routerMiddleware(history)
          )
      )
  )

  return store;
}