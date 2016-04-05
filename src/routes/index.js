import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'

import AppLayout from '../layout/AppLayout'
import HomeContainer from '../containers/HomeContainer'
import AboutContainer from '../containers/AboutContainer'
import LatestContainer from '../containers/LatestContainer'

const routes = (
    <Route path="/" component={AppLayout}>
      <IndexRoute component={HomeContainer}/>
      <Route path="/about" component={AboutContainer}/>
      <Route path="/latest" component={LatestContainer}/>
    </Route>
)

export default routes