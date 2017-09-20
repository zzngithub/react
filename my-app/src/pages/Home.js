/*
/!**
 * Created by sailing on 2017/9/11.
 *!/
import React from 'react';
import { Link } from 'react-router-dom';
import UserAdd from './UserAdd';
import HomeLayout from '../layouts/HomeLayout'
class Home extends React.Component {
   /!* render () {
        return (
            <div>
                <header>
                    <h1>Welcome</h1>
                </header>
                <main>
                    <Link to="/user/add">添加用户</Link>
                    <Link to="/user/list">用户列表</Link>
                </main>
            </div>
        );
    }*!/
    render () {
        return (
            <HomeLayout title="Welcome">
                <Link to="/user/list">用户列表</Link>
                <br/>
                <Link to="/user/add">添加用户</Link>
            </HomeLayout>
        );
    }
}
export default Home;*/

import React from 'react';
import style from '../styles/home-page.less';

class Home extends React.Component {
    render () {
        return (
            <div className={style.welcome}>
                Welcome
            </div>
        );
    }
}

export default Home;
