/**
 * Created by sailing on 2017/9/13.
 */
import {combineReducers} from 'redux';
import sys_menu from './menu_data_ready';
import user from './user'
const portalApp = combineReducers({
    sys_menu,
    user
})
export default portalApp