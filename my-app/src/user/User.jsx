import React,{ Component, PropTypes } from 'react';
import { Table,Button,Input,Icon,Popconfirm,Alert } from 'antd';
import "antd/dist/antd.css";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import AddUser from './AddUser.jsx';
import MenuList from '../menu/Menu';
import UserEdit from './UserEdit.jsx';
import {userListRefresh,deleteUser,insertStore} from '../action/index';
import {handleDel,handleSelectedDel,searchUser1} from '../service/userService'
const Search = Input.Search;

class UserList extends React.Component {
    constructor(props) {//   构造函数
        super(props);
        this.state = {
            index : '',
            PersonCount :0,
            selectedRowKeys:[],
            selectedRows:[],
            record : 'abc'
        };
       // this.handleSelectedDelete = this.handleSelectedDelete.bind(this);
       // this.searchUser = this.searchUser.bind(this);
    }
    /*组件完成加载后触发*/
    componentWillMount () {
        fetch('http://localhost:8000/user/', {
            method: 'get'
        })
            .then(res => res.json())
            .then(res => {
                this.props.loadUsers(res);
            })
            .catch(err => {
                console.error(err);
            });
    }
    /*渲染页面*/
    render() {
        const {userList,selectedRowKeys, selectedRows} =this.props;
        //联动选择框
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //this.setState({//将选中的id和对象存入state
                //    selectedRowKeys:selectedRowKeys,
                //    selectedRows:selectedRows
                //})
                this.props.insertStore(selectedRowKeys, selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // 名称为Disabled User 不选中
            }),
        }
        const columns = [
            { title: '编号', dataIndex: 'id',  width:'8%'},
            { title: '姓名', dataIndex: 'name', width:'15%'},
            { title: '性别', dataIndex: 'gender',width:'10%'},
            { title: '年龄', dataIndex: 'age',width:'15%', },
            { title: '学校', dataIndex: 'schoolname', width:'15%' },
            { title: '操作', dataIndex: '', key: 'operation', width:'25%',
                render: (text,record,index)=>(
                    <div>
                        <UserEdit pass={record} />
                        <Popconfirm title="确定要删除吗？" onConfirm={() => this.props.handleDelete(record)}>
                            <Button size="small"><Icon type="delete"></Icon></Button>
                        </Popconfirm>
                    </div>
                ) },
        ];
        return (
                <div >
                    <div>
                        <div >

                            <Search
                                placeholder="input search text"
                                style={{ width: 200 }}
                                onSearch={value => this.props.searchUser(value)}
                            />
                            <Button type="primary" className="selectedDelete" onClick={() => {this.props.handleSelectedDelete1(selectedRowKeys, selectedRows)}}>删除所选</Button>
                            <AddUser className="add_user_btn"/>
                        </div>
                    </div>
                    <Table columns={columns} dataSource={userList} className="table" rowSelection={rowSelection} scroll ={{y:800}}/>
                </div>
        );
    }
}
//返回state传递给子组件的属性
const mapStateToProps = (state,ownProps) => {
    return {userList:state.user.userList,selectedRowKeys:state.user.selectedRowKeys,selectedRows:state.user.selectedRows};
}
//映射dispatch到子组件的属性上
const mapDispatchToProps = dispatch => {
    return {
        handleDelete: (user) => {
            handleDel(user,dispatch);
        },
        loadUsers: (res) => {
            dispatch(userListRefresh({
                "userList":res
            }));
        },//将选中的id和对象存入state
        insertStore:(selectedRowKeys, selectedRows)=>{
            dispatch(insertStore(
                {
                    "selectedRowKeys":selectedRowKeys,
                    "selectedRows":selectedRows
                }))
        },//批量删除
        handleSelectedDelete1:(selectedRowKeys, selectedRows)=>{
            handleSelectedDel(selectedRowKeys,selectedRows,dispatch)
        },//查询
        searchUser:(value)=>{
            searchUser1(value,dispatch)
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserList);

