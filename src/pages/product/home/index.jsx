import React, { Component } from "react";
import { Card, Select, Input, Button, Icon, Table } from "antd";

import LinkButton from "../../../components/link-buttom";
const Option = Select.Option;

export default class ProductHome extends Component {
  state = {
    products: [
      {
        status: 2,
        imgs: ["1578588737108-index.jpg"],
        _id: "5e12b97de31bb727e4b0e349",
        name: "联想ThinkPad 翼4809",
        desc: "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
        price: 6300,
        pCategoryId: "5e12b8bce31bb727e4b0e348",
        categoryId: "5fc74b650dd9b10798413162",
        detail:
          '<p><span style="color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span></p>\n<p><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;"></span></p>\n',
        __v: 0,
      },
      {
        status: 1,
        imgs: ["image-1559402448049.jpg", "image-1559402450480.jpg"],
        _id: "5e12b9d1e31bb727e4b0e34a",
        name: "华硕(ASUS) 飞行堡垒",
        desc: "15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)",
        price: 6799,
        pCategoryId: "5e12b8bce31bb727e4b0e348",
        categoryId: "5fc74b650dd9b10798413162",
        detail:
          '<p><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;">华硕(ASUS) 飞行堡垒6 15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)火陨红黑</span>&nbsp;</p>\n<p><span style="color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;">【4.6-4.7号华硕集体放价，大牌够品质！】1T+256G高速存储组合！超窄边框视野无阻，强劲散热一键启动！</span>&nbsp;</p>\n',
        __v: 0,
      },
    ], //商品数组
  };
  //初始化table列的数组
  initColums = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
      },
      {
        title: "价格",
        dataIndex: "price",
        render: (price) => "¥" + price,
      },
      {
        width: 100,
        title: "状态",
        dataIndex: "status",
        render: (status) => {
          return (
            <span>
              <Button type="primary">下架</Button>
              <span>在售</span>
            </span>
          );
        },
      },
      {
        width: 100,
        title: "操作",
        render: (product) => {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          );
        },
      },
    ];
  };
  componentWillMount() {
    this.initColums();
  }

  render() {
    const { products } = this.state;

    const title = (
      <span>
        <Select value="0" style={{ width: 150 }}>
          <Option value="0">按名称搜索</Option>
          <Option value="1">按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{ width: 200, margin: "0 10px" }} />
        <Button type="primary">搜索</Button>
      </span>
    );
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加商品
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table bordered rowKey="_id" dataSource={products} columns={this.columns} />;
      </Card>
    );
  }
}
