import {
    GET_USERLOGS_BEGIN,
    GET_USERLOGS_ERROR,
    GET_USERLOGS_SUCCESS,
    GET_ORDERHISTORY_BEGIN,
    GET_ORDERHISTORY_SUCCESS,
    GET_ORDERHISTORY_ERROR,
    GET_USERTRANSACTION_BEGIN,
    GET_USERTRANSACTION_ERROR,
    GET_USERTRANSACTION_SUCCESS,
    GET_USERDETAILCARDINFO_BEGIN,
    GET_USERDETAILCARDINFO_ERROR,
    GET_USERDETAILCARDINFO_SUCCESS,
    GET_ALLUSERADDRESS_BEGIN,
    GET_ALLUSERADDRESS_ERROR,
    GET_ALLUSERADDRESS_SUCCESS

} from '../actions';

const userDetail_reducer = (state, action) => {

    if(action.type === GET_USERLOGS_BEGIN) {
        return {...state, userOrderLogs_loading: true, userOrderLogs_error: false}
    }

    if(action.type === GET_USERLOGS_ERROR) {
        return {...state, userOrderLogs_loading: false,  userOrderLogs_error: true}
    }

    if(action.type === GET_USERLOGS_SUCCESS ) {
        return {...state, userOrderLogs_loading: false, userOrderLogs: action.payload}
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

    if(action.type === GET_USERDETAILCARDINFO_BEGIN) {
        return {...state, userDetailCardInfo_loading: true, userDetailCardInfo_error: false}
    }

    if(action.type === GET_USERDETAILCARDINFO_ERROR) {
        return {...state, userDetailCardInfo_loading: false, userTransaction_error: true}
    }

    if(action.type ===GET_USERDETAILCARDINFO_SUCCESS) {
        return {...state, userDetailCardInfo_loading: false, userDetailCardInfo: action.payload}
    }

    if(action.type === GET_ALLUSERADDRESS_BEGIN) {
        return {...state, userAllAddress_loading: true, userAllAddress_error: false}
    }

    if(action.type === GET_ALLUSERADDRESS_ERROR) {
        return {...state, userAllAddress_loading: false,  userAllAddress_error: true}
    }

    if(action.type === GET_ALLUSERADDRESS_SUCCESS) {
        return {...state, userAllAddress_loading: false, userAllAddress: action.payload}
    }


    throw new Error(`No matching`);
};

export default userDetail_reducer;