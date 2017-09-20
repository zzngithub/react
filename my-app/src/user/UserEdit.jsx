import React from 'react';
import {Form,Input,Button,Select,Modal} from 'antd';
import User from './User.jsx';
import {updateUser} from '../action/index';
import { connect } from 'react-redux';
const FormItem = Form.Item;
const Option = Select.Option;
class  UserEdit extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
        this.handlePopup = this.handlePopup.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    handlePopup(){
        this.setState({
            visible: true
        });
    }
    componentDidMount() {
        this.props.form.setFieldsValue({
            name: this.props.pass.name,
            age: this.props.pass.age,
            gender: this.props.pass.gender,
            schoolname: this.props.pass.schoolname
        });
    }
    handleOk(){
        this.setState({
            visible: false
        });
    }
    handleCancel(){
        this.setState({
            visible: false
        });
    }
    /*修改保存信息*/
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err) {
                this.setState({
                    visible: false
                })
                fetch('http://localhost:8000/user/'+this.props.pass.id, {
                    method: 'put',
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
                            alert('修改用户成功');
                            return;
                        } else {
                            alert('修改失败');
                        }
                    })
                    .catch((err) => console.error(err));
            }
        })
    }

    render(){
       const {getFieldDecorator} = this.props.form;
       const fileValue=this.props.pass;
       const formItemLayout = {
           labelCol:{span : 6},
           wrapperCol:{span: 14}
       };
     return(
         <div>
             <a onClick={this.handlePopup}>编辑</a>
             <Modal title={this.props.pass.name} visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
             >
                 <Form onSubmit={this.handleSubmit}>
                     <FormItem {...formItemLayout} label = "用户名"  hasFeedback>
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
                             <Select placeholder="请选择您的性别"  >
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
                             <Input placeholder="请输入您的就读学校！"/>
                         )}
                     </FormItem>
                 </Form>
             </Modal>
         </div>
     )
   }
}

UserEdit = Form.create()(UserEdit);

const mapDispatchToProps = dispatch => {
    return {
        handleSave: (user) => {
            dispatch(updateUser(user))
        }
    }
}
const mapStateToProps = (state,ownProps) => {
    return { userList: state.user.userList }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserEdit)
