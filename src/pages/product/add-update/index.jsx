import React, { Component } from "react";

import { Card, Form, Input, Cascader, Upload, Button, Icon } from "antd";
import LinkButton from "../../../components/link-buttom";
import { reqCategorys } from "../../../api";

const Item = Form.Item;
const { TextArea } = Input;

// const options = [
//   {
//     value: "zhejiang",
//     label: "Zhejiang",
//     isLeaf: false,
//   },
//   {
//     value: "jiangsu",
//     label: "Jiangsu",
//     isLeaf: false,
//   },
// ];

class ProductAddUpdate extends Component {
  state = {
    options:[],
  };
  initOptions = (categorys) =>{
   const options = categorys.map(c=>({
        value: c._id,
        label: c.name,
        isLeaf: false,
    }))
    this.setState({options})
  }
  getCategorys = async(parentId) =>{
    const result = await reqCategorys(parentId)
    if (result.status===0) {
        const categorys = result.data
        if (parentId===0) {
            this.initOptions(categorys)  
        }else{
            return categorys
        }
    }
  }

  loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    //根据选中的分类，请求获取二级分类列表
    const subCategorys = await this.getCategorys(targetOption.value)
    if(subCategorys&&subCategorys.length>0){
        
    }else{

    }

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${subCategorys.name} Dynamic 1`,
          value: "dynamic1",
          isLeaf:true
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: "dynamic2",
          isLeaf:true
        },
      ];
      this.setState({
        options: [...this.state.options],
      });
    }, 1000);
  };

  submit = () => {
    //进行表单验证，通过发送请求.
    this.props.form.validateFields((error, values) => {
      if (!error) {
        alert("发送请求");
      }
    });
  };
  validatePrice = (rule, value, callback) => {
    if (value * 1 > 0) {
      callback();
    } else {
      callback("价格必须大于0");
    }
  };
  componentDidMount(){
    this.getCategorys(0)
  }
  render() {
    const title = (
      <span>
        <LinkButton>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>添加商品</span>
      </span>
    );
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };

    const { getFieldDecorator } = this.props.form;
    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label="商品名称">
            {getFieldDecorator("name", {
              initialValue: "",
              rules: [{ required: true, message: "必须输入商品名称" }],
            })(<Input placeholder="请输入商品名称" />)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator("desc", {
              initialValue: "",
              rules: [{ required: true, message: "必须输入商品描述" }],
            })(
              <TextArea
                placeholder="请输入商品描述"
                autoSize={{ minRows: 2, maxRows: 5 }}
              />
            )}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator("price", {
              initialValue: "",
              rules: [
                { required: true, message: "必须输入商品名称" },
                { validator: this.validatePrice },
              ],
            })(
              <Input
                type="number"
                addonAfter="元"
                placeholder="请输入商品价格"
              />
            )}
          </Item>
          <Item label="商品分类">
            <Cascader
              options={this.state.options} //需要显示的列表数据
              loadData={this.loadData} //当选择某个
            />
          </Item>
          <Item label="商品图片">
            <div>商品图片</div>
          </Item>
          <Item label="商品详情">
            <div>商品详情</div>
          </Item>
          <Item>
            <Button type="primary" onClick={this.submit}>
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(ProductAddUpdate);
