import { combineReducers } from 'redux'
import { INCREMENT, DECREMENT } from '../actions'


export function count(state = 0, { type }) {
  switch(type) {
    case INCREMENT:
      return state + 1
    
    case DECREMENT:
      return state - 1
    
    default:
      return state
  }
}

export default combineReducers ({
  count
})