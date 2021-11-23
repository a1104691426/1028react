import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";

import { PAGE_SIZE } from "../../utils/constants";
import { reqRoles } from "../../api";
import AddForm from "./add-form";
import {reqAddRole} from '../../api'

//角色路由
export default class Role extends Component {
  state = {
    roles: [], //所有角色的列表
    role: {}, //选中的role
    isShowAdd: false, //是否显示添加界面
  };
  initColumn = () => {
    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
      },
    ];
  };
  getRoles = async () => {
    const result = await reqRoles();
    if (result.status === 0) {
      const roles = result.data;
      this.setState({ roles });
    }
  };
  onRow = (role) => {
    return {
      onClick: (event) => {
        console.log(role);
        this.setState({
          role,
        });
      },
    };
  };
  addRole =() => {
    this.form.validateFields( async(error,values)=>{
      if (!error) {
        //隐藏确认框
        this.setState({isShowAdd:false})
        const {roleName} = values
        //this.form.resetFields()
        const result = await reqAddRole(roleName)
        console.log(result,roleName);
        if (result.status===0) {
          message.success('添加角色成功')
          this.getRoles()
        }else{
          message.error('添加角色失败')
        }
      }
    })
  };
  handleCancel = () => {
    this.setState({ isShowAdd: false });
    this.form.resetFields()
  };

  componentWillMount() {
    this.initColumn();
  }
  componentDidMount() {
    this.getRoles();
  }
  render() {
    const { roles, role, isShowAdd } = this.state;
    const title = (
      <span>
        <Button
          type="primary"
          style={{ marginRight: 10 }}
          onClick={() => {
            this.setState({ isShowAdd: true });
          }}
        >
          创建角色
        </Button>
        <Button type="primary" disabled={!role._id}>
          设置角色权限
        </Button>
      </span>
    );
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
          rowSelection={{
            type: "radio",
            selectedRowKeys: [role._id],
            onSelect: (role) => {
              // 选择某个radio时回调
              this.setState({
                role,
              });
            },
          }}
          onRow={this.onRow}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={this.handleCancel}
        >
          <AddForm
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>
      </Card>
    );
  }
}
