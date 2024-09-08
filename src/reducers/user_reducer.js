import {
    GET_USERFORCREATEORDER_BEGIN,
    GET_USERFORCREATEORDER_ERROR,
    GET_USERFORCREATEORDER_SUCCESS
  } from '../actions';

const user_reducer = (state, action) => {

    if(action.type === GET_USERFORCREATEORDER_BEGIN) {
        return {...state, usernameForCreateOrder_loading: true, usernameForCreateOrder_error: false}
    }

    if(action.type ===GET_USERFORCREATEORDER_ERROR) {
        return {...state, usernameForCreateOrder_loading: false, usernameForCreateOrder_error: true }
    }

    if(action.type === GET_USERFORCREATEORDER_SUCCESS) {
        return {...state, usernameForCreateOrder_loading: false, usernameForCreateOrder: action.payload}
    }

    throw new Error(`No matching`);
}

export default user_reducer;