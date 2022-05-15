import React, { Component } from "react";
import { withRouter,Link } from "react-router-dom";

import LinkButtom from "../../../components/link-buttom";
import { Modal, Icon  } from "antd";
import menuList from "../../../config/menuConfig";
import { reqWeather } from "../../../api";
import memoryUtils from "../../../utils/memoryUtils";
import storageUtils from "../../../utils/storageUtils";
import { formateDate } from "../../../utils/dateUtils";
import "./index.less";
class ShopHeader extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    weather: "",
  };
  gitTitle = () => {
    const path = this.props.location.pathname;
    let title;
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0);
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };
  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({ currentTime });
    }, 1000);
  };
  getWeather = async () => {
    const result = await reqWeather();
    this.setState({ weather: result });
  };
  ptsrc = () => {
    const weather = this.state.weather;
    // if (weather==='多云') {
    //     return 'http://api.map.baidu.com/images/weather/day/duoyun.png'
    // }if (weather==='晴') {
    //     return 'http://api.map.baidu.com/images/weather/day/qing.png'
    // } if (weather==='阴') {
    //     return 'http://api.map.baidu.com/images/weather/day/yin.png'
    // }else {
    //     return 'http://api.map.baidu.com/images/weather/day/zhongyu.png'
    // }
    const weatherMap = {
      多云: "http://api.map.baidu.com/images/weather/day/duoyun.png",
      晴: "http://api.map.baidu.com/images/weather/day/qing.png",
      阴: "http://api.map.baidu.com/images/weather/day/yin.png",
      default: "http://api.map.baidu.com/images/weather/day/zhongyu.png",
    };
    const icon = weatherMap[weather] || weatherMap["default"];
    return icon;
  };
  logout = () => {
    Modal.confirm({
      content: "确定退出吗？",
      onOk: () => {
        storageUtils.removeUser(); //清楚本地数据
        memoryUtils.user = {}; //清楚内存数据
        this.props.history.replace("/login");
      },
    });
  };
  componentWillUnmount() {
    //清楚定时器
    clearInterval(this.intervalId);
  }
  componentDidMount() {
    this.getTime();
    this.getWeather();
  }
  render() {
    const { currentTime, weather } = this.state;
    const username = memoryUtils.user.username;
    const title = this.gitTitle();
    return (
      <div className="header">
      <div className="header-top">
        <span>欢迎,{username}</span>
        <Link style={{marginRight:'5px'}} ><Icon type="shopping-cart" />购物车</Link>
        <Link style={{marginRight:'5px'}} ><Icon type="menu" />我的订单</Link>
        <Link ><Icon type="user" />我的账户</Link>
        <LinkButtom onClick={this.logout}>退出</LinkButtom>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{title}</div>
        <div className="header-bottom-right">
          <span>{currentTime}</span>
          {<img src={this.ptsrc()} alt="weather" />}
          <span>{weather}</span>
        </div>
      </div>
    </div>
    );
  }
}
export default withRouter(ShopHeader);