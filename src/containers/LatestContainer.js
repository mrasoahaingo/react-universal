import { connect } from 'react-redux'
import { pre } from 'reasync'
import { getLatest } from 'reducers/movies'

import List from 'components/List'

const preResolve = ({ dispatch }) => {
  return dispatch(getLatest())
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies
  }
}

let ListContainer = connect(
    mapStateToProps
)(pre(preResolve)(List))

export default ListContainer