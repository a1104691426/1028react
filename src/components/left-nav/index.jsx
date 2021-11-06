import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";

import logo from "../../assets/images/logo192.png";
import menuList from "../../config/menuConfig";
import "./index.less";

const { SubMenu } = Menu;

class LeftNav extends Component {
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.map((item) => {
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
        const cItem = item.children.find((cItem) => cItem.key === path);
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
    });
  };
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    const path = this.props.location.pathname;
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
