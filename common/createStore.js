import { createStore as _createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import reducers, {updateStateApp} from 'reducers'

export const initialState = {
  app: {
    count: 1,
    movies: [],
    detail: {}
  }
}

const requestMiddleware = () => ({ getState, dispatch }) => next => action => {
  if(!action.payload || !action.payload.request) {
    return next(action)
  }

  console.log('WORKER middleware REQUEST', action)

  return fetch(action.payload.request.url, {
    mode: 'cors',
    redirect: 'follow',
    headers: new Headers({
      'Content-Type': 'text/plain'
    })
  })
      .then(response => response.json())
      .then(response => {
        const successAction = {data: response, type: `${action.type}_SUCCESS`}
        console.log('WORKER middleware SUCCESS', successAction)
        next(successAction)
      })
}

const workerMiddleware = (worker) => {
  return ({ getState, dispatch }) => next => action => {

    if(['INCREMENT', 'DECREMENT', 'LATEST', 'DETAIL'].indexOf(action.type) === -1) {
      return next(action)
    }

    console.log('CLIENT middleware', action)
    
    return worker.postMessage(action)
  }
}

export const remoteStore = (data = initialState) => {

  const store = _createStore(
      reducers,
      data,
      compose(
          applyMiddleware(
              requestMiddleware()
          )
      )
  )

  return store;
}

export default function (history, data = initialState, worker) {
  const store = _createStore(
      updateStateApp,
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