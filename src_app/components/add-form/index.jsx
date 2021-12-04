import React, { Component } from "react";
import PropTypes from 'prop-types'

import { Form, Select, Input } from "antd";
/*
添加分类的form组件
*/
const Item = Form.Item;
const Option = Select.Option;
class AddForm extends Component {

  static propsTypes = {
    setFrom:PropTypes.func.isRequired,
    catergorys:PropTypes.array.isRequired,
    parentId:PropTypes.string.isRequired
  }
  componentWillMount(){
    //将form对象通过setForm()传递父组件
    this.props.setForm(this.props.form)

  }
  render() {
    const {categorys,parentId}=this.props
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Item>
          {getFieldDecorator('parentId',{
              initialValue:parentId
          })(
            <Select>
              <Option value="0">一级分类</Option>
              {categorys.map(c => <Option value={c._id}>{c.name}</Option>)}
            </Select>
          )}
        </Item>
        <Item>
            {getFieldDecorator('categoryName',{
                initialValue:'',
                rules:[
                  {
                    required:true,
                    message:'分类名称必须输入'
                  }
                ]
            })(
                <Input placeholder="请输入分类名称" />
            )}
        </Item>
      </Form>
    );
  }
}
export default Form.create()(AddForm);
