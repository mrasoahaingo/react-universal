import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import remoteReducers from '../reducers'
import initialState from 'store/initialState'

const requestMiddleware = () => ({ getState, dispatch }) => next => action => {
  if(!action.payload || !action.payload.request) {
    return next(action)
  }
  console.log('[REMOTE] middleware fetch data', action)
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
        console.log('[REMOTE] fetch success', successAction)
        next(successAction)
      })
}

export default (data = initialState) => {

  const store = _createStore(
      remoteReducers,
      data,
      compose(
          applyMiddleware(
              requestMiddleware()
          )
      )
  )

  return store;
}

