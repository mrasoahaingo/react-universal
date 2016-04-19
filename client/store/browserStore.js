import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import _ from 'lodash'
import appReducer from '../reducer'
import initialState from 'store/initialState'
import * as actionTypes from 'constants/actionTypes'

const workerMiddleware = worker => ({ getState, dispatch }) => next => action => {
  if(!_.values(actionTypes).includes(action.type)) {
    return next(action)
  }
  console.log('[BROWSER] middleware post message', action)
  return worker.postMessage(action)
}

export default (data = initialState, history, worker) => {
  const store = _createStore(
      appReducer,
      data,
      compose(
          applyMiddleware(
              workerMiddleware(worker),
              routerMiddleware(history)
          )
      )
  )

  return store;
}