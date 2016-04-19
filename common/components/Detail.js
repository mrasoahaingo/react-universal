import React, { Component } from 'react'
import { connect } from 'react-redux'
import { preResolve } from 'reasync'
import Velocity from 'velocity-animate'
import { getDetail } from 'remote/reducers/detail'
import Page from './Page'
import Loading from './Loading'

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
    this.isLoaded() && this.enterTransition()
  }

  componentDidUpdate() {
    this.isLoaded() && this.enterTransition()
  }

  enterTransition() {
    Velocity.RunSequence([
      { e: this.image, p: { translateX: 800, scale: 2 }, o: { duration: 1000 } },
      { e: this.title, p: { translateY: 200 }, o: { duration: 100 } },
      { e: this.article, p: { translateY: 100 }, o: { duration: 100 } }
    ])
  }

  isLoaded() {
    return !!this.props.detail.title
  }

  render() {
    const { detail: { title, backdrop_path } } = this.props

    if(!this.isLoaded()) {
      return <Loading/>
    }
    
    return (
      <Page>
        <article ref={ref => this.article = ref }>
            <h1 ref={ref => this.title = ref }>{title}</h1>
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
 