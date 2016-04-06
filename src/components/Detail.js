import React, { Component } from 'react'
import { connect } from 'react-redux'
import { preResolve } from 'reasync'
import { getDetail } from 'reducers/detail'

@preResolve(
  ({ params: { movieId }, dispatch }) => dispatch(getDetail(movieId))
)
@connect(
  state => ({
    detail: state.detail
  })
)
class List extends Component {

  render() {
    const { detail: { title, backdrop_path } } = this.props

    return (
        <div>
          <h1>{title}</h1>
          <img srcSet={`
              https://image.tmdb.org/t/p/w185${backdrop_path} 1x,
              https://image.tmdb.org/t/p/w370${backdrop_path} 2x
            `}/>
        </div>
    )
  }

}

export default List
 