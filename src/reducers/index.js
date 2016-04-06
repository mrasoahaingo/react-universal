import { combineReducers } from 'redux'
import count from './count'
import movies from './movies'
import detail from './detail'
import { routerReducer as routing } from 'react-router-redux'

export default combineReducers({
  detail,
  count,
  movies,
  routing
})