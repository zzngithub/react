/**
 * Created by sailing on 09/13/2017.
 */

export const menuListRefreshed = menulist => {
    return{
        type:"MENU_LIST_REFRESHED",
        menulist
    }
}
export const menuDataReady = menuData => {
    return{
        type:"MENU_DATA_READY",
        menuData
    }
}

export const userListRefresh = userList => {
    return{
        type:"USER_LIST",
        userList
    }
}
export const addUser = user => {
    return{
        type:"USER_ADD",
        user
    }
}
export const updateUser = user => {
    return{
        type:"USER_UPDATE",
        user
    }
}
export const deleteUser = user => {
    return{
        type:"USER_DELETE",
        user
    }
}
export const insertStore = (selectedRowKeys)=>{
    return{
        type:"XIN_XI",
        selectedRowKeys

    }
}
