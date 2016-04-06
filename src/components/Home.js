import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment, decrement } from 'reducers/count'

@connect(
  state => ({
    count: state.count
  }),
  dispatch => ({
    onIncrement: () => {
      dispatch(increment())
    },
    onDecrement: () => {
      dispatch(decrement())
    }
  })
)
class Home extends Component {
  
  render() {
    const { count, onIncrement, onDecrement } = this.props

    return (
        <div>
          <h1>Live ({count})</h1>
          <button type="button" onClick={onIncrement}>+</button>
          <button type="button" onClick={onDecrement}>-</button>
        </div>
    )
  }
  
}

export default Home
 