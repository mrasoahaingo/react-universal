import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment, decrement } from 'remote/reducers/count'
import Page from './Page'

@connect(
  state => ({
    count: state.app.count
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
      <Page>
        <h1>Lives ({count})</h1>
        <button type="button" onClick={onIncrement}>+</button>
        <button type="button" onClick={onDecrement}>-</button>
      </Page>
    )
  }
  
}

export default Home
 