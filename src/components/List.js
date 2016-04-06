import React, { Component } from 'react'
import { connect } from 'react-redux'
import { preResolve } from 'reasync'
import { getLatest } from 'reducers/movies'

@preResolve(
  ({ dispatch }) => dispatch(getLatest())
)
@connect(
  state => ({
    movies: state.movies
  })
)
class List extends Component {

  render() {
    const { movies } = this.props

    return (
        <div>
          <h1>List</h1>
          <ul>{movies.map(movie => <li key={movie.id}>{movie.title}</li>)}</ul>
        </div>
    )
  }

}

export default List
 