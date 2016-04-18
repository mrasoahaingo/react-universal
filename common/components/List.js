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
    this.enterTransition()
  }

  componentDidUpdate() {
    this.enterTransition()
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

  render() {
    const { movies } = this.props

    if(movies.length === 0) {
      return <Loading/>
    }

    return (
      <Page>
        <h1>List</h1>
        {movies.map(movie => (
          <div key={movie.id} style={{opacity: 0}} ref={ref => this.sequence.push(this.getSequence(ref))}>
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
 