import React, { Component } from 'react'
import {Switch,Route,Redirect } from 'react-router-dom'
import ShopHome from "./home";
import Details from './details';


export default class Shop extends Component {
  render() {
    return (
        <Switch>
        {/*
        exact Route的路径完全匹配
        */ }
        <Route path='/shop' component={ShopHome} exact/>
        <Route path='/shop/details' component={Details} />
        <Redirect to='/shop' />
      </Switch>
    )
  }
}
