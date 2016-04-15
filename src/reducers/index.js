import { combineReducers } from 'redux'
import count from './count'
import movies from './movies'
import detail from './detail'
import { routerReducer as routing } from 'react-router-redux'

const app = (state = {}, {type, data}) => {
  console.log('INITIAL', state)
  switch (type) {
    case 'UPDATE_STATE':
      console.log('updateStateApp', state, data, 'MERGED', Object.assign({}, state, data.app))
      return Object.assign({}, state, data.app)
    default:
      return state
  }
}

export const updateStateApp = combineReducers({
  app,
  routing
})

export default combineReducers({
  app: combineReducers({
    detail,
    count,
    movies
  }),
  routing
})