/**
 * Created by sailing on 2017/9/13.
 */

const user = (state = {"isLoaded":false},action) => {
    switch (action.type) {
        case 'USER_LIST':{
            return Object.assign({},state,action.userList);
        }
        case 'USER_ADD': {
            console.log(JSON.stringify(state));
            console.log(action);
            return Object.assign({},state, {userList:[...state.userList,action.user]});
        }
        case 'USER_UPDATE': {
            //console.log(JSON.stringify(state));
            return Object.assign({},state, {userList:[...(state.userList.filter(item => item.id !== action.user.id)),action.user]});
        }
        case 'USER_DELETE': {
            console.log("删除用户：下面是action");
            console.log(action);
            return Object.assign({},state, {userList:[...(state.userList.filter(item => item.id !== action.user.id))]});
        }
        case 'XIN_XI':{
            console.log("reduer===....");
            console.log(action);
            return Object.assign({},state, action.selectedRowKeys);
        }
        default:
            return state
    }
}

export default user;
