/**
 * Created by zzn on 2017/9/19.
 */
import {deleteUser,userListRefresh} from '../action/index';
/*删除*/
export const handleDel =(user,dispatch)=> {
    fetch('http://localhost:8000/user/' + user.id, {
        method: 'delete'
    })
        .then(res => res.json())
        .then(res => {
            /*this.props.handleDelete(user);*/
            dispatch(deleteUser(user));
        })
        .catch(err => {
            console.error(err);
        });
}

/*批量删除*/
export const  handleSelectedDel=(selectedRowKeys, selectedRows,dispatch)=>{
    if(selectedRowKeys){
        if(selectedRowKeys.length>0){
            selectedRows.map((element) => {
                fetch('http://localhost:8000/user/' + element.id, {
                    method: 'delete'
                })
                    .then(res => res.json())
                    .then(res => {
                        dispatch(deleteUser(element));
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
        }
        else{

        }
    }else{
        console.log('1');
    }

}
/*查询*/
export const searchUser1=(value,dispatch)=>{
    let url='';
    if(value!=''){
        url='http://localhost:8000/user?id='+value.trim();
    }else{
        url='http://localhost:8000/user'
    }
    fetch(url, {
        method: 'get'
    })
        .then(res => res.json())
        .then(res => {
            dispatch(userListRefresh({
                "userList":res
            }));
        });
}

