import React, { Component } from 'react'

class Home extends Component {

  componentDidMount() {
    const { getLatest } = this.props
    getLatest()
  }
  
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

export default Home
 