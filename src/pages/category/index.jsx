import React, { Component } from "react";

import { Card, Table, Button, Icon, message } from "antd";
import { reaAddCategory, reqCategorys, reqUpdateCategory } from "../../api";
import LinkButtom from "../../components/link-buttom";
//商品分类路由
export default class Category extends Component {
  state = {
    loading: false,
    subCategorys: [],
    categorys: [],
    parentId: "0",
    parentName: "",
  };
  //初始化Table所有列的数组
  initColums = () => {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作",
        width: 300,
        render: (category) => (
          <span>
            <LinkButtom>修改分类</LinkButtom>
            <LinkButtom onClick={() => this.showSubCategorys(category)}>
              查看子分类
            </LinkButtom>
          </span>
        ),
      },
    ];
  };
  getCategorys = async () => {
    this.setState({ loading: true });
    const { parentId } = this.state;
    const result = await reqCategorys(parentId);
    this.setState({ loading: false });
    if (result.status === 0) {
      //取出分类数组
      const categorys = result.data;
      if (parentId === "0") {
        //获取一级分类列表
        this.setState({ categorys });
      } else {
        //获取二级分类列表
        this.setState({ subCategorys: categorys });
      }
    } else message.error("获取分类列表失败");
  };
  showSubCategorys = (category) => {
    this.setState({ parentId: category._id, parentName: category.name }, () => {
      //在状态更新且重新render()后执行
      this.getCategorys();
    });
    //setState()在这是异步更新状态，不能立即更新状态。
    //获取二级分类列表
  };
  //为第一次render()准备数据
  componentWillMount() {
    this.initColums();
  }
  //执行异步任务，异步ajax请求
  componentDidMount() {
    this.getCategorys();
  }
  render() {
    const { loading, categorys, subCategorys, parentId, parentName } =
      this.state;
    //读取状态数据

    const title = "一级分类列表";
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          rowkey="_id"
          bordered
          loading={loading}
          dataSource={parentId === "0" ? categorys : subCategorys}
          columns={this.columns}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
        ;
      </Card>
    );
  }
}
