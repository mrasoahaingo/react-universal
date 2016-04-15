import React, { Component } from 'react'

class Page extends Component {
  
  render() {
    return (
        <section ref={ref => this.page = ref} style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: '#fff'}}>
          {this.props.children}
        </section>
    )
  }

}

export default Page
 