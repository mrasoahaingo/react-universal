import { connect } from 'react-redux'
import { getLatest } from '../actions'

import List from '../components/List'

const mapStateToProps = (state) => {
  return {
    movies: state.movies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLatest: () => {
      dispatch(getLatest())
    }
  }
}

let ListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(List)

export default ListContainer