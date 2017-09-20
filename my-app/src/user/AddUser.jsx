import React from 'react';
import {Form,Input,Button,Select,Modal} from 'antd';
import { connect } from 'react-redux';
import { addUser } from '../action/index';
const FormItem = Form.Item;
const Option = Select.Option;

class  AddUser extends React.Component{//在es6中定义一个AddUser类
    constructor(props){//构造函数
        super(props);
        this.state = {
            visible:false
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }
    handleAdd() {
        this.setState({
            visible: true
        });
    }
    handleSubmit(e){//提交表单
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err) {
                this.setState({
                    visible: false
                })
                this.props.form.resetFields();//清空提交的表单
                fetch('http://localhost:8000/user', {
                    method: 'post',
                    body: JSON.stringify({
                        "name": values.name,
                        "gender": values.gender,
                        "age": values.age,
                        "schoolname": values.schoolname
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    })
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.id) {
                            values.id=res.id;
                            this.props.handleSave(values);
                            alert('添加用户成功');
                            return;
                        } else {
                            alert('添加失败');
                        }
                    })
                    .catch((err) => console.error(err));
            }
        })
    }
    /*点击确认*/
    handleOk() {
        this.setState({
            visible: false
        });
    }
    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{span : 6},
            wrapperCol:{span: 14}
        };
        return(
            <span>
                <Button type="primary" onClick={this.handleAdd}>添加用户</Button>
                <Modal title="新建用户" visible={this.state.visible} onCancel={this.handleOk} onOk={this.handleSubmit}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout} label = "用户名"  hasFeedback >
                            {getFieldDecorator('name', {
                                rules:[{
                                    required:true,message:'请输入您的 name！'
                                }]
                            })(
                                <Input placeholder="请输入您的用户名！"/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="性别" hasFeedback>
                            {getFieldDecorator('gender',{
                                rules:[{
                                    required:true,message:'请输入您的 gender！'
                                }]
                            })(
                                <Select placeholder="请选择您的性别">
                                    <Option value="男">男</Option>
                                    <Option value="女">女</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="年龄" hasFeedback>
                            {getFieldDecorator('age',{
                                rules:[{required:true,message:'请输入您的 Age'
                                }]
                            })(
                                <Input placeholder="请输入您的年龄！"/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="就读学校" hasFeedback>
                            {getFieldDecorator('schoolname',{
                                rules:[{required:true,message:'请输入您的就读学校'}]
                            })(
                                <Input placeholder="请输入您的就读学校！" />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </span>
        )
    }
}
AddUser = Form.create()(AddUser); //解决了getFieldDecorator无法定义;

const mapDispatchToProps = dispatch => {
    return {
        handleSave: (user) => {
            dispatch(addUser(user))
        }
    }
}
const mapStateToProps = (state,ownProps) => {
  return { userList: state.user.userList }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddUser)