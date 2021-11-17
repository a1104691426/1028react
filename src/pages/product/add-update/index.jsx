import React, { Component } from "react";

import { Card, Form, Input, Cascader, Upload, Button, Icon } from "antd";
import LinkButton from "../../../components/link-buttom";
import { reqCategorys } from "../../../api";
import PicturesWall from "../pictures-wall";
import RichTextEditor from '../rich-text-editor'

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
    options: [],
  };
  constructor (props){
    super(props)
    //创建用来保存rfe标识的标签对象的容器
    this.pw = React.createRef()
  }
  initOptions = async (categorys) => {
    const options = categorys.map((c) => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }));
    //如果是一个二级分类商品的更新
    const {isUpdate,product} = this
    const {pCategoryId} = product
    if(isUpdate && pCategoryId!=='0'){
      //获取对应的二级分类列表
      const subCategorys = await this.getCategorys(pCategoryId)
      //生成二级下拉列表的options
      const childOptions = subCategorys.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }))
      //找到当前商品对应的一级option对象
      const targetOption = options.find(option=> option.value===pCategoryId)
      //关联对应的一级option上
      targetOption.children = childOptions;
    }
    this.setState({ options });
  };
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId);
    if (result.status === 0) {
      const categorys = result.data;
      if (parentId === "0") {
        this.initOptions(categorys);
      } else {
        return categorys;
      }
    }
  };

  loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;
    //根据选中的分类，请求获取二级分类列表
    const subCategorys = await this.getCategorys(targetOption.value);
    targetOption.loading = false;
    if (subCategorys && subCategorys.length > 0) {
      //生成一个二级列表的options
      const childOptions = subCategorys.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));
      //关联到当前option上
      targetOption.children = childOptions;
    } else {
      targetOption.isLeaf = true;
    }
    // 更新状态
    this.setState({
      options: [...this.state.options],
    });
  };

  submit = () => {
    //进行表单验证，通过发送请求.
    this.props.form.validateFields((error, values) => {
      if (!error) {
        alert("发送请求");
        const imgs = this.pw.current.getImgs()
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
  componentDidMount() {
    this.getCategorys("0");
  }
  componentWillMount(){
  const product = this.props.location.state
  this.product = product || {}
  this.isUpdate= !!product //保存是否是更新的标识
  }
  render() {
    const {isUpdate,product} = this
    const {pCategoryId,categoryId,imgs} = product
    //用来接收级联分类ID的数组
    const categoryIds = []
    if (isUpdate) {
      if(pCategoryId==='0'){
        //商品是一个一级分类的商品
        categoryIds.push(categoryId)
      }else{
        categoryIds.push(pCategoryId,categoryId)
      }  
    }
    const title = (
      <span>
        <LinkButton onClick={this.props.history.goBack}>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>{isUpdate ? '修改商品':'添加商品'}</span>
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
              initialValue: product.name,
              rules: [{ required: true, message: "必须输入商品名称" }],
            })(<Input placeholder="请输入商品名称" />)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator("desc", {
              initialValue: product.desc,
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
              initialValue: product.price,
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
            {getFieldDecorator("categoryIds", {
              initialValue: categoryIds,
              rules: [{ required: true, message: "必须选择商品分类" }],
            })(
              <Cascader
                placeholder='请选择商品分类'
                options={this.state.options} //需要显示的列表数据
                loadData={this.loadData} //当选择某个
              />
            )}
          </Item>
          <Item label="商品图片">
            <PicturesWall ref={this.pw} imgs={imgs}/>
          </Item>
          <Item 
            label="商品详情"
            labelCol={{span:2}}
            wrapperCol={{span:20}} 
          >
          <RichTextEditor />
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

/*
  1.子组件调用父组件的方法：将父组件的方法以函数属性的形式传递给子组件，子组件可以调用

  2.父组件调用子组件的方法：在父组件中通过ref得到子组件标签对象（也就是组件对象），调用其方法。
*/ 