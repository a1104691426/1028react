import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button } from "antd";
import {connect} from 'react-redux'

import "./login.less";
import { login } from "../../redux/actions";
import logo from "../../assets/images/logo192.png";

const Item = Form.Item; // 不能写在import之前

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { username, password } = values;
        //调用分发异步action的函数 => 发登录异步请求，有了结果后更新状态
        this.props.login(username,password)
      }else {
        console.log('校验失败');
      }
    });
  };

  render() {
    //如果用户已经登录
    const user = this.props.user
    if(user&&user._id){
      return <Redirect to='/home'/>
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </div>
        <section className="login-content">
        <div className={user.errorMsg ? 'error-msg show' : 'error-msg'}>{user.errorMsg}</div>
          <h2>用户登录</h2>
          <div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Item>
                {/*
                用户名/密码的的合法性要求
                    1). 必须输入
                    2). 必须大于等于4位
                    3). 必须小于等于12位
                    4). 必须是英文、数字或下划线组成
                */}
                {getFieldDecorator("username", {
                  // 配置对象: 属性名是特定的一些名称
                  // 声明式验证: 直接使用别人定义好的验证规则进行验证
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: "用户名必须输入",
                    },
                    { min: 4, message: "用户名至少4位" },
                    { max: 12, message: "用户名最多12位" },
                    {
                      pattern: /^[a-zA-Z0-9_]+$/,
                      message: "用户名必须是英文、数字或下划线组成",
                    },
                  ],
                  initialValue: "admin", // 初始值
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="用户名"
                  />
                )}
              </Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: "密码必须输入",
                    },
                    { min: 4, message: "密码至少4位" },
                    { max: 12, message: "密码最多12位" },
                    {
                      pattern: /^[a-zA-Z0-9_]+$/,
                      message: "密码必须是英文、数字或下划线组成",
                    },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登陆
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>
      </div>
    );
  }
}
const WrapLogin =Form.create()(Login)
export default connect(
  state => ({user:state.user}),
  {login}
)(WrapLogin);
