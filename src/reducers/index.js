import { combineReducers } from 'redux'
import count from './count'
import movies from './movies'
import { routerReducer as routing } from 'react-router-redux'

export default combineReducers({
  count,
  movies,
  routing
})