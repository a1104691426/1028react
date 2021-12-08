import React, { Component } from "react";
import {connect} from 'react-redux'

import Counter from '../components/Counter'
import {increment,decrement,incrementAsync} from '../redux/actions'

/*
 connect()：高阶函数
 connect()返回的函数是一个高阶组件：接收一个UI组件，生成一个容器组件
 容器组件的责任：向ui组件传入特定的属性
 */


/*
用来将redux管理的state数据映射成UI组件的一般属性 
*/

/*
function mapStateToProps (state){
 return {
   count:state.count,
 }
}

// 用来将包含dispatch代码的函数映射成UI组件的函数属性的函数

function mapDispatchToProps (dispatch) {
  return {
    increment: (number) => dispatch(increment(number)),
    decrement: (number) => dispatch(decrement(number))
  }
}
export default connect(
  mapStateToProps,//指定一般属性
  mapDispatchToProps,//指定函数属性
)(Counter)
*/
export default connect(
  state => ({count:state.count}),
  {increment,decrement,incrementAsync}
  //指定函数属性
)(Counter)

