import React, { Component } from 'react'
import { Route,Switch } from 'react-router-dom';

import Admin from './pages/admin';
import Login from './pages/login';


export default class App extends Component {

  render() {
    return (
      <div className='appDiv'>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </div>
    )
  }
}

