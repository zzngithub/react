import React, { Component } from 'react';
import Button from 'antd/lib/button';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Home from './pages/Home';
import UserList from './user/User';
import UserEdit from './user/UserEdit.jsx';
import AddUser from './user/AddUser.jsx';
import HomeLayout from './layouts/HomeLayout';
import Login from './pages/Login';
import {userListRefresh,menuDataReady} from './action/index';
class App extends Component {
    render() {
       // const { isLoaded } = this.props;

        //if(isLoaded){
          //  this.props.loadUsers();
            return (
                <Router>
                    <HomeLayout>
                        <Route path="/" component={Home}/>
                        <Route path="/user/list" component={UserList}/>
                        <Route path="/user/edit" component={UserEdit}/>
                        <Route path="/user/edit/:key" component={UserEdit}/>
                    </HomeLayout>
                </Router>
            );
        //}
    }
}
/*const mapStateToProps = state => {
    return {isLoaded:true};
}*/

/*const mapDispatchToProps = dispatch => {
    return {
        loadUsers: () => {
            fetch('http://localhost:8000/user')
                .then(res => res.json())
                .then(res => {
                    dispatch(userListRefresh({
                        "userList":res
                    }));
                });
        }
    }
}*/

export default App;
//export default (App);

