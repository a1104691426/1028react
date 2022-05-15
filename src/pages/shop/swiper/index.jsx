import React, { Component } from 'react';
import { Carousel } from 'antd';
import {BASE_IMG_URL} from '../../../utils/constants'
import './swiper.css'


export default class Swiper extends Component {

  render() {
    
    const { products } = this.props

    return (

      <div className='swiperFather'>
        <Carousel autoplay >
            {

              products && products.length > 0 &&products.map((item, index) => {

                return (
                    <div key={index} >
                      <img src={BASE_IMG_URL+item.imgs} style={{width:'auto' ,hight:'auto'}}/>
                    </div>
                  )

              })
            }
            </Carousel>
      </div>

    )

  }
}