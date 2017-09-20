import React from 'react';
import formProvider from '../utils/formProvider';
import FormItem from '../components/FormItem';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';
import UserEditor from '../components/UserEditor';
import request, {get} from '../utils/request';
class UserAdd extends React.Component {
    constructor (props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
      //  this.contextTypes.router=this.contextTypes.router.bind(this);
    }
    handleSubmit (e) {
        e.preventDefault();

        const {form: {name, age, gender}, formValid} = this.props;
        if (!formValid) {
            alert('请填写正确的信息后重试');
            return;
        }

        fetch('http://localhost:8000/user', {
            method: 'post',
            body: JSON.stringify({
                name: name.value,
                age: age.value,
                gender: gender.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.id) {
                  //  this.context.router.push('/user/list');
                    this.context.router.push('./user/list');
                    alert('添加用户成功');
                    return;
                } else {
                    alert('添加失败');
                }
            })
            .catch((err) => console.error(err));
    }
    render () {
        const {form: {name, age, gender}, onFormChange} = this.props;
        return (
            <HomeLayout title="添加用户">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <UserEditor></UserEditor>
                    </form>
                </HomeLayout>
        );
    }
}
UserAdd.contextTypes = {
    router: React.PropTypes.object.isRequired
};
UserAdd = formProvider({
    name: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return value.length > 0;
                },
                error: '请输入用户名'
            },
            {
                pattern: /^.{1,4}$/,
                error: '用户名最多4个字符'
            }
        ]
    },
    age: {
        defaultValue: 0,
        rules: [
            {
                pattern: function (value) {
                    return value >= 1 && value <= 100;
                },
                error: '请输入1~100的年龄'
            }
        ]
    },
    gender: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return !!value;
                },
                error: '请选择性别'
            }
        ]
    }
})(UserAdd);

export default UserAdd;