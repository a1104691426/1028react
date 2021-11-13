import React, { Component } from "react";
import { Card, Icon, List } from "antd";

import { BASE_IMG_URL } from "../../../utils/constants";
import LinkButtom from "../../../components/link-buttom";
import { reqCategory } from "../../../api";

const Item = List.Item;

export default class ProductDetail extends Component {
  state = {
    cName1: "",
    cName2: "",
  };
  async componentDidMount() {
    const { pCategoryId, categoryId } = this.props.location.state;
    if (pCategoryId === "0") {
      const result = await reqCategory(categoryId);
      if (result.status === "0") {
        const cName1 = result.data.name;
        this.setState({ cName1 });
      }
    } else {
    //   const result = await reqCategory(categoryId);
    //   const presult = await reqCategory(pCategoryId);
    //   const cName1 = presult.data.name;
    //   const cName2 = result.data.name;
    //一次性发多个请求，只有都成功了，才正常处理
        const results = await Promise.all([reqCategory(categoryId),await reqCategory(pCategoryId)])
        const cName1 = results[0].data.name;
        const cName2 = results[1].data.name; 
        this.setState({ cName1, cName2 });
    }
  }
  render() {
    const { name, desc, price, detail, imgs } = this.props.location.state;
    const { cName1, cName2 } = this.state;
    const title = (
      <span>
        <LinkButtom>
          <Icon
            type="arrow-left"
            onClick={() => this.props.history.goBack()}
            style={{ color: "green", marginRight: 15, fontSize: 20 }}
          />
        </LinkButtom>
        <span>商品详情</span>
      </span>
    );
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item className="list-item">
            <span className="left">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item className="list-item">
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item className="list-item">
            <span className="left">商品价格:</span>
            <span>{price}</span>
          </Item>
          <Item className="list-item">
            <span className="left">所属分类:</span>
            <span>
              {cName1}{cName2 ? ' -- '+cName2 : ''}
            </span>
          </Item>
          <Item className="list-item">
            <span className="left">商品图片:</span>
            <span>
              {imgs.map((img) => (
                <img
                  key={img}
                  src={BASE_IMG_URL + img}
                  className="product-img"
                  alt="img"
                />
              ))}
            </span>
          </Item>
          <Item className="list-item">
            <span className="left">商品详情:</span>
            <span
              dangerouslySetInnerHTML={{
                __html: '<h1 style="color:red" >内容标题</h1>',
              }}
            ></span>
          </Item>
        </List>
      </Card>
    );
  }
}
