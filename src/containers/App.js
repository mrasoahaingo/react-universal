import { connect } from 'react-redux'
import { increment, decrement } from '../actions'

import App from '../components/App'

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => {
      dispatch(increment())
    },
    onDecrement: () => {
      dispatch(decrement())
    }
  }
}

let AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer