/**
 * Created by sailing on 09/08/2017.
 */

const menu_reducer = (state = {"isLoaded":false},action) => {

    switch (action.type) {
        case 'MENU_DATA_READY':
            console.log("MENU_DATA_READY");
            console.log(action);
            return action.menuData;
        default:
            return state
    }

}

export default menu_reducer