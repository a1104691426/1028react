import React, { Component } from "react";
import { Card,Pagination  } from "antd";
import { reqProducts } from "../../../api";
import {BASE_IMG_URL} from '../../../utils/constants'
import Swiper from "../swiper";
import ShopHeader from "../shopheader";
import './shop.css'

export default class ShopHome extends Component {
  state = {
    products: [], //商品数组
    total:0 ,
    Currentindex:1,
  };

  getProducts = async (pageNum) => {
    this.pageNum = pageNum;
    const result = await reqProducts(pageNum, 10);
    if (result.status === 0) {
      const { total, list } = result.data;
      this.setState({
        total,
        products: list,
        Currentindex:pageNum
      });
    }
  };
  componentDidMount() {
    this.getProducts(1);
  }
  render() {
    const { Meta } = Card;
    const {products,total,Currentindex} = this.state

    return (
      <div>
        <ShopHeader />
        <Swiper products={products}/> 
            {
              this.state.products.map((item,index) => (
            <div className="card"  onClick={()=> this.props.history.push("/shop/details", item)}  key={index} style={{width:238,hight:260}}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    style={{width:238,height:238}}
                    alt="example"
                    src={BASE_IMG_URL+item.imgs}
                  />
                }
              >
                <Meta title= {item.name} description={'价格: ¥'+item.price} />
              </Card>
              </div>
              )
              )

              } 
              <Pagination className="pagination" current = {Currentindex} total={total} onChange={this.getProducts}/>
    
      </div>
    );
  }
}
