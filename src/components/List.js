import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
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
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <img srcSet={`
                    https://image.tmdb.org/t/p/w185${movie.backdrop_path} 1x,
                    https://image.tmdb.org/t/p/w370${movie.backdrop_path} 2x
                  `}/>
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
    )
  }

}

export default List
 