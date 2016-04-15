import React, { Component } from 'react'
import { connect } from 'react-redux'
import { preResolve } from 'reasync'
import Velocity from 'velocity-animate'
import { getDetail } from 'reducers/detail'
import Page from './Page'

@preResolve(
  ({ params: { movieId }, dispatch }) => dispatch(getDetail(movieId))
)
@connect(
  state => ({
    detail: state.app.detail
  })
)
class List extends Component {

  componentDidMount() {

    const sequence = [
      { e: this.image, p: { translateX: 800, scale: 2 }, o: { duration: 1000 } },
      { e: this.title, p: { translateY: 200 }, o: { duration: 100 } },
      { e: this.article, p: { translateY: 100 }, o: { duration: 100 } }
    ]

    Velocity.RunSequence(sequence)
  }

  render() {
    const { detail: { title, backdrop_path } } = this.props

    return (
      <Page>
        <article ref={ref => this.article = ref }>
            <h1 ref={ref => this.title = ref } ref={ref => this.title = ref}>{title}</h1>
            <div ref={ref => this.image = ref }>
              <img srcSet={`
                  https://image.tmdb.org/t/p/w185${backdrop_path} 1x,
                  https://image.tmdb.org/t/p/w370${backdrop_path} 2x
                `}/>
            </div>
        </article>
      </Page>
    )
  }

}

export default List
 