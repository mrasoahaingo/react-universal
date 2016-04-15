import React, { Component } from 'react'
import { Link } from 'react-router'

import 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { VelocityTransitionGroup } from 'velocity-react'

class App extends Component {

  render() {
    return (
        <section>
          <header style={{position: 'absolute', top: 0, right: 0, height: 20, left: 0}}>
            Header, <Link to={'/'}>Home</Link>, <Link to={'/about'}>About</Link>, <Link to={'/latest'}>Latest</Link>
          </header>
          <section  style={{position: 'absolute', top: 20, right: 0, bottom: 20, left: 0}}>
            <VelocityTransitionGroup
                enter={{animation: "fadeIn", style: { zIndex: 2}}}
                leave={{animation: "fadeOut", style: { zIndex: 1}, delay: 1000}}>
              {React.cloneElement(this.props.children, {
                key: this.props.location.pathname
              })}
            </VelocityTransitionGroup>
          </section>
          <footer style={{position: 'absolute', height: 20, right: 0, bottom: 0, left: 0}}>
            Footer
          </footer>
        </section>
    )
  }

}

export default App