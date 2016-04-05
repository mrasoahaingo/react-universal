import { createStore as _createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import axiosMiddleware from 'redux-axios-middleware'

import reducers from 'reducers'

export const initialState = {
  count: 0,
  movies: []
}

export default function (history, data = initialState, client) {
  const store = _createStore(
      reducers,
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