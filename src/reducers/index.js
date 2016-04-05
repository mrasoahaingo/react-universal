import { combineReducers } from 'redux'
import { INCREMENT, DECREMENT } from '../actions'

function count(state = 0, { type }) {
  switch (type) {
    case INCREMENT:
      return state + 1
    
    case DECREMENT:
      return state - 1
    
    default:
      return state
  }
}

function movies(state = [], { type, payload }) {
  switch (type) {
    case 'LATEST':
      return payload.response.data.results
    default:
      return state
  }
}

export default {
  count,
  movies
}