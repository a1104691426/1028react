import React, { Component } from 'react'

import memoryUtils from '../../utils/memoryUtils'
import './index.less'
export default class Header extends Component {
    render() {
        const username = memoryUtils.user.username
        return (
            <div className="header">
                <div className='header-top'>
                    <span>欢迎,{username}</span>
                    <a href="javascript">退出</a>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>首页</div>
                    <div className='header-bottom-right'>
                        <span>2021年11月2日21:01:55</span>
                        <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt="weather" />
                        <span>多云</span>
                    </div>
                </div>
            </div>
        )
    }
}
