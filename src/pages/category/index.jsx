import React, { Component } from "react";

import { Card, Table, Button, Icon, message, Modal } from "antd";
import { reaAddCategory, reqCategorys, reqUpdateCategory } from "../../api";
import LinkButtom from "../../components/link-buttom";
import AddForm from "../../components/add-form";
import UpdateForm from "../../components/update-form";
//商品分类路由
export default class Category extends Component {
  state = {
    loading: false,
    subCategorys: [],
    categorys: [],
    parentId: "0",
    parentName: "",
    showStatus: 0, //标识添加/更新的确认框是否显示，0：都不显示。1 显示添加，2 显示更新。
  };
  //点击取消，隐藏确定框
  handleCancel = () => {
    this.setState({ showStatus: 0 });
  };
  //显示添加
  showAdd = () => {
    this.setState({ showStatus: 1 });
  };
  //添加分类
  addCategory = () => {

  };
  //显示修改的确认框
  showUpdate=(category)=>{
    //保存分类对象
    this.category =category
    this.setState({ showStatus: 2 });
  }
  //更新分类
  updateCategory = async() => {
    //1.隐鲹确定框
    this.setState({ showStatus: 0 });
    //2.发请求更新分类
    const categoryId = this.category._id
    const categoryName= this.form.getFieldValue('categoryName')
    console.log(categoryName);
    const result = await reqUpdateCategory(categoryId, categoryName)
    if (result.status===0) {
      this.getCategorys()
    } else {
      message.error()
    }
    //3.重新显示列表
    this.getCategorys()
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
            <LinkButtom onClick={()=>this.showUpdate(category)}>修改分类</LinkButtom>
            {this.state.parentId === "0" ? (
              <LinkButtom onClick={() => this.showSubCategorys(category)}>
                查看子分类
              </LinkButtom>
            ) : null}
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
  //显示一级分类列表
  showCategorys = () => {
    this.setState({
      subCategorys: [],
      parentId: "0",
      parentName: "",
    });
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
    const {
      loading,
      categorys,
      subCategorys,
      parentId,
      parentName,
      showStatus,
    } = this.state;
    const category = this.category || {};
    //读取状态数据

    const title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <span>
          <LinkButtom onClick={this.showCategorys}>一级分类列表</LinkButtom>
          <Icon type="arrow-right" style={{ marginRight: 5 }}></Icon>
          <span>{parentName}</span>
        </span>
      );
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
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
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm />
        </Modal>

        <Modal
          title="更新分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm categoryName={category.name} 
          setForm={(form)=>{this.form = form}}
          />
        </Modal>
      </Card>
    );
  }
}
