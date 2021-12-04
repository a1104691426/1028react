import React, { Component } from "react";

import "./index.less";

export default class LinkButtom extends Component {
  render() {
    return <button {...this.props} className="link-buttom"></button>;
  }
}
