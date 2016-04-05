import { createStore as _createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import axiosMiddleware from 'redux-axios-middleware'

import liveApp from '../src/reducers'

export const initialState = {
  count: 0,
  movies: []
}

export default function (history, data = initialState, client) {
  const reducer = combineReducers({
    ...liveApp,
    routing: routerReducer
  })

  const store = _createStore(
      reducer,
      data,
      compose(
          applyMiddleware(
              axiosMiddleware(client),
              routerMiddleware(history)
          )
      )
  )

  return store;
}