import {
    GET_CUSTOMER_BEGIN,
    GET_CUSTOMER_ERROR,
    GET_CUSTOMER_SUCCESS,
    GET_CUSTOMERORDER_BEGIN,
    GET_CUSTOMERORDER_ERROR,
    GET_CUSTOMERORDER_SUCCESS
} from '../actions';

const customer_reducer = (state, action) => {
    if(action.type === GET_CUSTOMER_BEGIN) {
        return {...state, customer_error: false, customer_loading: true};
    }

    if(action.type === GET_CUSTOMER_ERROR) {
        return {...state, customer_error: true, customer_loading: false};
    }

    if(action.type === GET_CUSTOMER_SUCCESS) {
        return {...state, customer_loading: false, customers: action.payload}
    }
    if(action.type === GET_CUSTOMERORDER_BEGIN) {
        return {...state, customerwithaddress_error: false, customerwithaddress_loading: true};
    }

    if(action.type === GET_CUSTOMERORDER_ERROR) {
        return {...state, customerwithaddress_error: true, customerwithaddress_loading: false};
    }

    if(action.type === GET_CUSTOMERORDER_SUCCESS) {
        return {...state, customerwithaddress_loading: false, customerwithaddress: action.payload}
    }

};

export default customer_reducer;