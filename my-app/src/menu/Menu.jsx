import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
const {SubMenu} = Menu;
class MenuList extends React.Component {
    state = {
        menuItem:[
            {id: '1',   bpid:'',     name: '用户列表', icon: 'user', route: '/user/list',},
            {id: '2',   bpid: '1', name: 'Users', icon: 'user', route: '/user',},
            {id: '7',   bpid: '1', name: 'Posts', icon: 'shopping-cart', route: '/post',},
            {id: '3',   bpid: '1', name: 'Request', icon: 'api', route: '/request',},
            {id: '4',   bpid: '1', name: 'UI Element', icon: 'camera-o',},
            {id: '41', bpid: '4', mpid: '4', name: 'IconFont', icon: 'heart-o', route: '/UIElement/iconfont',},
            {id: '42', bpid: '4', mpid: '4', name: 'DataTable', icon: 'database', route: '/UIElement/dataTable',},
            {id: '43', bpid: '4', mpid: '4', name: 'DropOption', icon: 'bars', route: '/UIElement/dropOption',},
            {id: '44', bpid: '4', mpid: '4', name: 'Search', icon: 'search', route: '/UIElement/search',},
            {id: '45', bpid: '4', mpid: '4', name: 'Editor', icon: 'edit', route: '/UIElement/editor',},
            {id: '46', bpid: '4', mpid: '4', name: 'layer (Function)', icon: 'credit-card', route: '/UIElement/layer',},
            {id: '5', bpid: '1', name: 'Recharts', icon: 'code-o',},
            {id: '51', bpid: '5', mpid: '5', name: 'LineChart', icon: 'line-chart', route: '/chart/lineChart',},
            {id: '52', bpid: '5', mpid: '5', name: 'BarChart', icon: 'bar-chart', route: '/chart/barChart',},
            {id: '53', bpid: '5', mpid: '5', name: 'AreaChart', icon: 'area-chart', route: '/chart/areaChart',},
            {id: '6', bpid: '1', name: 'Test Navigation', icon: 'setting',},
            {id: '61', bpid: '6', mpid: '6', name: 'Test Navigation1', route: '/navigation/navigation1',},
        ],
        collapsed: false,
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        let menus=[];
        menus=this.state.menuItem.filter(item => item.mpid ==undefined);/*篩選第一層幾點*/
        menus.map(menu => {
                let sidemenus=[];
                sidemenus=this.state.menuItem.filter(item => item.mpid === menu.id);/*第二層節點*/
                sidemenus.map( sidemenu =>{
                        let menuitems=[];
                        menuitems=this.state.menuItem.filter(item => item.mpid === sidemenu.id);
                        sidemenu.children=menuitems;
                        return menuitems;
                    }
                )
                menu.children=sidemenus
                return sidemenus;
            }
        )
       // const {menuItems,selectedKey} = this.props;//父组件传递参数给子组件
        return (
            <div style={{ width: 240 }}>
                <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark" inlineCollapsed={this.state.collapsed}>
                    {
                        menus.map(item=>{
                           if(item.children!== undefined && item.children.length > 0){
                               return(
                                   <SubMenu
                                       key={item.id}
                                       title={<span>{item.icon !== undefined && item.icon !== "" ? <Icon type={item.icon}/>:""}<span>{item.name}</span></span>}
                                   >
                                       {
                                           item.children.map((chItem) => {
                                               return (
                                                       <Menu.Item key={ chItem.id }>
                                                           <Link key={chItem.id+chItem.route} to={chItem.route}>
                                                               {chItem.icon !== undefined && chItem.icon !== "" ?
                                                                   <Icon type={chItem.icon}/> : ""}
                                                               <span>{chItem.name}</span>
                                                           </Link>
                                                       </Menu.Item>
                                               )
                                           })
                                       }
                                   </SubMenu>
                               )
                           }else{
                               return (
                                   <Menu.Item key={ item.id }>
                                       <Link key={item.id+item.route} to={item.route}>
                                       {item.icon !== undefined && item.icon !== "" ?
                                           <Icon type={item.icon}/> : ""}
                                       <span>{item.name}</span>
                                       </Link>
                                   </Menu.Item>
                                 )
                           }
                        }
                       )
                    }
                </Menu>
            </div>
        );
    }
}

export default MenuList;