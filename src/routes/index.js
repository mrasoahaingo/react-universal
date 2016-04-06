import React from 'react'
import { Router, Route, IndexRoute, Link } from 'react-router'

import AppLayout from 'layout/AppLayout'
import Home from 'components/Home'
import About from 'components/About'
import List from 'components/List'

const routes = history => (
    <Router history={history}>
      <Route path="/" component={AppLayout}>
        <IndexRoute component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/latest" component={List}/>
      </Route>
    </Router>
)

export default routes