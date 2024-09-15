import {
    GET_USERFORCREATEORDER_BEGIN,
    GET_USERFORCREATEORDER_ERROR,
    GET_USERFORCREATEORDER_SUCCESS,
    GET_USERBYID_BEGIN,
    GET_USERBYID_ERROR,
    GET_USERBYID_SUCCESS  
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

    if(action.type === GET_USERBYID_BEGIN) {
        return {...state, userById_loading: true, userById_error: false}
    }

    if(action.type === GET_USERBYID_ERROR) {
        return {...state, userById_error: true, userById_loading: false }
    }

    if(action.type === GET_USERBYID_SUCCESS) {
        return {...state, userById_loading: false, userById: action.payload}
    }


    throw new Error(`No matching`);
}

export default user_reducer;