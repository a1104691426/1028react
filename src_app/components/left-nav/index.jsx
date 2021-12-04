import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";

import logo from "../../assets/images/logo192.png";
import menuList from "../../config/menuConfig";
import "./index.less";
import memoryUtils from '../../utils/memoryUtils'

const { SubMenu } = Menu;

class LeftNav extends Component {
  //判断当前登录用户对item是否有权限
  hasAuth = (item)=>{
    const {key,isPublic} = item
    const username = memoryUtils.user.username
    const menus = memoryUtils.user.role.menus

    //1.如果当前用户是admin
    //2.如果当前item是公开的
    //3.当前用户有此item的权限：key有没有在menus中
    if (username==='admin' || isPublic || menus.indexOf(key)!==-1) {
      return true
    }else if(item.children ){//当前用户有此item的某个子item的权限
      return  !!item.children.find(child =>  menus.indexOf(child.key)!==-1)
    }
    return false
  }
  getMenuNodes = (menuList) => {

    const path = this.props.location.pathname;
    return menuList.map((item) => {
      if (this.hasAuth(item)) {
        const { key, icon, title } = item;
        if (!item.children) {
          return (
            <Menu.Item key={key}>
              <Link to={key}>
                <Icon type={icon} />
                <span>{title}</span>
              </Link>
            </Menu.Item>
          );
        } else {
          const cItem = item.children.find((cItem) => path.indexOf(cItem.key)===0);
          if (cItem) {
            this.openKey = key;
          }
          return (
            <SubMenu
              key={key}
              title={
                <span>
                  <Icon type={icon} />
                  <span>{title}</span>
                </span>
              }
            >
              {this.getMenuNodes(item.children)} {/*递归调用children*/}
            </SubMenu>
          );
        }
      }
     
    });
  };
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    let path = this.props.location.pathname;
    if (path.indexOf('/product')===0) {
      path = '/product'
    }
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>电商后台</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}
export default withRouter(LeftNav);
