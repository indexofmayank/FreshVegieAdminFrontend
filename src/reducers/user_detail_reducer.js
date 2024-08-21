import {
    GET_USERLOGS_BEGIN,
    GET_USERLOGS_ERROR,
    GET_USERLOGS_SUCCESS,
    GET_ORDERHISTORY_BEGIN,
    GET_ORDERHISTORY_SUCCESS,
    GET_ORDERHISTORY_ERROR,
    GET_USERTRANSACTION_BEGIN,
    GET_USERTRANSACTION_ERROR,
    GET_USERTRANSACTION_SUCCESS
} from '../actions';

const userDetail_reducer = (state, action) => {

    if(action.type === GET_USERLOGS_BEGIN) {
        return {...state, userDetail_loading: true, userDetail_error: false}
    }

    if(action.type === GET_USERLOGS_ERROR) {
        return {...state, userDetail_loading: false,  userDetail_error: true}
    }

    if(action.type === GET_USERLOGS_SUCCESS ) {
        return {...state, userDetail_loading: false, userDetails: action.payload}
    }

    if(action.type === GET_ORDERHISTORY_BEGIN) {
        return {...state, userOrderHistory_loading: true, userOrderHistory_error: false}
    }

    if(action.type === GET_ORDERHISTORY_ERROR) {
        return {...state, userOrderHistory_loading: false, userOrderHistory_error: true}
    }

    if(action.type === GET_ORDERHISTORY_SUCCESS) {
        return {...state, userOrderHistory_loading: false, userOrderHistory: action.payload}
    }

    if(action.type === GET_USERTRANSACTION_BEGIN) {
        return {...state, userTransaction_loading: true, userTransaction_error: false}
    }

    if(action.type === GET_USERTRANSACTION_ERROR) {
        return {...state, userTransaction_loading: false, userTransaction_error: true}
    }

    if(action.type === GET_USERTRANSACTION_SUCCESS) {
        return {...state, userTransaction_loading: false, userTransactions: action.payload}
    }

    throw new Error(`No matching`);
};

export default userDetail_reducer;