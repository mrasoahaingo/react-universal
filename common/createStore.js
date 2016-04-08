import { createStore as _createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import axiosMiddleware from 'redux-axios-middleware'
import createSagaMiddleware from 'redux-saga'

import reducers from 'reducers'
import sagas from 'common/sagas'

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
              routerMiddleware(history),
              createSagaMiddleware(sagas)
          )
      )
  )

  return store;
}