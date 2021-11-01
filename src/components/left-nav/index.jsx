import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Menu, Icon } from 'antd';

import logo from '../../assets/images/logo192.png' 
import './index.less'

const { SubMenu } = Menu;

export default class LeftNav extends Component {
    
    render() {
        return (
            
            <div className="left-nav">
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo" />
                    <h1>电商后台</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    >
                    <Menu.Item key="1">
                        <Link to='/home'>
                            <Icon type="pie-chart" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                        <span>
                            <Icon type="mail" />
                            <span>商品</span>
                        </span>
                        }
                    >
                        <Menu.Item key="2">
                            <Link to='/category'>
                                <span>
                                    <Icon type="mail" />
                                    <span>品类管理</span>
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to='/product'>
                                <span>
                                    <Icon type="mail" />
                                    <span>商品管理</span>
                                </span>
                            </Link>
                        </Menu.Item>
                        
                    </SubMenu>
                    <Menu.Item key="4">
                        <Link to='/user'>
                            <Icon type="pie-chart" />
                            <span>用户管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to='role'>
                            <Icon type="pie-chart" />
                            <span>角色管理</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub2"
                        title={
                        <span>
                            <Icon type="mail" />
                            <span>图形图标</span>
                        </span>
                        }
                    >
                        <Menu.Item key="6">
                            <Link to='/charts/bar'>
                                <span>
                                    <Icon type="mail" />
                                    <span>柱形图</span>
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to='/charts/line'>
                                <span>
                                    <Icon type="mail" />
                                    <span>折线图</span>
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to='/charts/pie'>
                                <span>
                                    <Icon type="mail" />
                                    <span>饼图</span>
                                </span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    </Menu>
            </div>
            
        )
    }
}
