import React, { Component } from "react";
import PropTypes from "prop-types";
import { increment,decrement } from "./redux/actions";
export default class App extends Component {
  // state = {
  //     count:0
  // }
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.numberRef = React.createRef();
  }
  increment = () => {
    const number = this.numberRef.current.value*1;
    this.props.store.dispatch(increment(number))
  }
  decrement = () =>{
    const number = this.numberRef.current.value*1;
    this.props.store.dispatch(decrement(number))
  }
  incrementIfOdd = () =>{
    const number = this.numberRef.current.value*1;
    if( this.props.store.getState()%2=== 1 ){
        this.props.store.dispatch(increment(number))
    }
  }
  incrementAsync = () =>{
      const number = this.numberRef.current.value*1
      setTimeout(()=>{
        this.props.store.dispatch(increment(number))
      },1000)
  }

  render() {
    const count = this.props.store.getState();
    return (
      <div>
        <p>点击了{count}次</p>
        <div>
          <select ref={this.numberRef}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>{" "}
          &nbsp;&nbsp;&nbsp;
          <button onClick={this.increment}>+</button>&nbsp;&nbsp;
          <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
          <button onClick={this.incrementIfOdd}>奇数加</button>&nbsp;&nbsp;
          <button onClick={this.incrementAsync}>异步加</button>&nbsp;&nbsp;
        </div>
      </div>
    );
  }
}
