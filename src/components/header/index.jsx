import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import { Modal } from 'antd';
import menuList from '../../config/menuConfig'
import { reqWeather } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import { formateDate } from '../../utils/dateUtils'
import './index.less'
class Header extends Component {
    state = {
        currentTime : formateDate(Date.now()),
        weather:'',
    }
    gitTitle = ()=>{
        const path = this.props.location.pathname
        let title
        menuList.forEach(item=>{
            if (item.key===path) {
                title = item.title
            }else if(item.children){
                const cItem =item.children.find(cItem => cItem.key===path)
                if(cItem) {
                    title = cItem.title    
                }
            }
        })
        return title
    }
    getTime=()=>{
        setInterval(()=>{
            const currentTime =formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }
    getWeather=async()=>{
        const result = await reqWeather()
        this.setState({weather:result})
    }
    ptsrc=()=>{
        const weather = this.state.weather
        if (weather==='多云') {
            return 'http://api.map.baidu.com/images/weather/day/duoyun.png'
        }if (weather==='晴') {
            return 'http://api.map.baidu.com/images/weather/day/qing.png'
        } if (weather==='阴') {
            return 'http://api.map.baidu.com/images/weather/day/yin.png'
        }else {
            return 'http://api.map.baidu.com/images/weather/day/zhongyu.png'
        }
    }
    logout = ()=>{
        Modal.confirm({
            content: '确定退出吗？',
            onOk() {
              console.log('OK');
            },
            onCancel() {
              console.log('Cancel');
            },
          })
    }
    componentDidMount(){
        this.getTime()
        this.getWeather()
    }
    render() {
        const {currentTime,weather} = this.state
        const username = memoryUtils.user.username
        const title = this.gitTitle()
        return (
            <div className="header">
                <div className='header-top'>
                    <span>欢迎,{username}</span>
                    <a onClick={this.logout} href="javascript">退出</a>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        {<img src={this.ptsrc()} alt="weather" />}
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)
