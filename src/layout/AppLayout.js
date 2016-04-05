import React, { Component } from 'react'
import { Link } from 'react-router'

class App extends Component {

  render() {

    const { children } = this.props

    return (
        <section>
          <header>Header, <Link to={'/'}>Home</Link>, <Link to={'/about'}>About</Link></header>
          <section>
            {children}
          </section>
          <footer>Footer</footer>
        </section>
    )
  }

}

export default App