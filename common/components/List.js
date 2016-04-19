import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { preResolve } from 'reasync'
import Velocity from 'velocity-animate'
import { getLatest } from 'remote/reducers/movies'
import Page from './Page'
import Loading from './Loading'

@preResolve(
  ({ dispatch }) => dispatch(getLatest())
)
@connect(
  state => ({
    movies: state.app.movies
  })
)
class List extends Component {

  sequence = []

  componentDidMount() {
    this.isLoaded() && this.enterTransition()
  }

  componentDidUpdate() {
    this.isLoaded() && this.enterTransition()
  }
  
  enterTransition() {
    Velocity.RunSequence(this.sequence)
  }

  getSequence(ref) {
    return {
      e: ref,
      p: { translateX: 10, opacity: 1 },
      o: { duration: 100 }
    }
  }

  isLoaded() {
    return this.props.movies.length > 0
  }
  
  render() {
    const { movies } = this.props

    if(!this.isLoaded()) {
      return <Loading/>
    }

    return (
      <Page>
        <h1>List</h1>
        {movies.map((movie, i) => (
          <div key={movie.id} style={{opacity: i < 5 ? 0 : 1}} ref={ref => i < 5 && this.sequence.push(this.getSequence(ref))}>
            <Link to={`/movie/${movie.id}`}>
              <img srcSet={`
                https://image.tmdb.org/t/p/w185${movie.backdrop_path} 1x,
                https://image.tmdb.org/t/p/w370${movie.backdrop_path} 2x
              `}/>
              {movie.title}
            </Link>
          </div>
        ))}
      </Page>
    )
  }

}

export default List
 