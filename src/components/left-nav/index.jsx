import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';

import logo from '../../assets/images/logo192.png'
import menuList from '../../config/menuConfig';
import './index.less'

const { SubMenu } = Menu;

class LeftNav extends Component {
    getMenuNodes = (menuList) =>{
        const path = this.props.location.pathname
        return menuList.map(item=>{
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
               const cItem = item.children.find(cItem => cItem.key === path)
               if(cItem){
                this.openKey = item.key
               }
                return (
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {this.getMenuNodes(item.children)} {/*递归调用children*/}
                    </SubMenu>
                )
            }
        })
    }
    componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList)
    }
    
    render() {
        const path = this.props.location.pathname
        return (
            
            <div className="left-nav">
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo" />
                    <h1>电商后台</h1>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                    >
                    {
                       this.menuNodes
                    }
                </Menu>
            </div>
            
        )
    }
}
export default withRouter(LeftNav)
