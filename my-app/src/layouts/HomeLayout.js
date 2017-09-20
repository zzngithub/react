/**
 * Created by sailing on 11/09/2017.
 */
import React from 'react';
import { Layout, Breadcrumb,Row,Col,Icon } from 'antd';
import Menu from '../menu/Menu';
import { withRouter } from 'react-router'
//import style from '../styles/HomeLayout.less';


const { Content, Sider } = Layout;

class HomeLayout extends React.Component{

    constructor(props){
        super(props);
        this.state={
            collapsed: false
        };
    }
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    render(){
        const {children} = this.props;
        return (
            <Layout>
                <Layout>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <Menu />
                    </Sider>
                        <Layout>
                            <Content style={{ background: '#fff', padding: 100,minWidth:900, minHeight:800}}>
                                {children}
                            </Content>
                        </Layout>
                </Layout>
            </Layout>
        );
    }
}
export default HomeLayout

