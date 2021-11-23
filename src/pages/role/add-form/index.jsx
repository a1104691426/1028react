import React, { Component } from "react";
import PropTypes from 'prop-types'

import { Form , Input } from "antd";
/*
添加分类的form组件
*/
const Item = Form.Item;
class AddForm extends Component {

  static propsTypes = {
    setForm:PropTypes.func.isRequired,
    catergorys:PropTypes.array.isRequired,
    parentId:PropTypes.string.isRequired
  }
  
  componentWillMount(){
    //将form对象通过setForm()传递父组件
    this.props.setForm(this.props.form)

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 15 },
      };
    return (
      <Form>
        <Item label='角色名称' {...formItemLayout}>
            {getFieldDecorator('roleName',{
                initialValue:'',
                rules:[
                  {
                    required:true,
                    message:'角色名称必须输入'
                  }
                ]
            })(
                <Input placeholder="请输入角色名称" />
            )}
        </Item>
      </Form>
    );
  }
}
export default Form.create()(AddForm);
