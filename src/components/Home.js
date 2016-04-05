import React, { Component } from 'react'

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
 