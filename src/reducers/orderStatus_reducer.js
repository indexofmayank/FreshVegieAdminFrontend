import {
    GET_ORDERSTATUS_BEGIN,
    GET_ORDERSTATUS_ERROR,
    GET_ORDERSTATUS_SUCCESS,
    GET_TOTALORDERCOUNT_BEGIN,
    GET_TOTALORDERCOUNT_ERROR,
    GET_TOTALORDERCOUNT_SUCCESS,
    GET_TOTALAVGCOUNT_SUCCESS,
    GET_TOTALAVGCOUNT_BEGIN,
    GET_TOTALAVGCOUNT_ERROR,
    GET_TOTALSALES_BEGIN,
    GET_TOTALSALES_ERROR,
    GET_TOTALSALES_SUCCESS
  
} from '../actions';


const orderStatus_reducer = (state, action) => {

    if(action.type === GET_ORDERSTATUS_BEGIN) {
        return {...state, orderStatus_loading: true, orderStatus_error: false }
    }

    if(action.type === GET_ORDERSTATUS_ERROR) {
        return {...state, orderStatus_loading: false, orderStatus_error: true}
    }

    if(action.type === GET_ORDERSTATUS_SUCCESS) {
        return {...state, orderStatus_loading: false, orderStatus: action.payload}
    }

    if(action.type === GET_TOTALORDERCOUNT_BEGIN) {
        return {...state, totalOrder_loading: true, totalOrder_error: false }
    }

    if(action.type === GET_TOTALORDERCOUNT_ERROR) {
        return {...state, totalOrder_loading: false, totalOrder_error: true}
    }

    if(action.type === GET_TOTALORDERCOUNT_SUCCESS) {
        return {...state, totalOrder_loading: false, totalOrder: action.payload}
    }

    if(action.type === GET_TOTALAVGCOUNT_BEGIN) {
        return {...state, totalAvg_loading: true, totalAvg_error: true}
    }

    if(action.type === GET_TOTALAVGCOUNT_ERROR) {
        return {...state, totalAvg_loading: false, totalAvg_error: true }
    }

    if(action.type === GET_TOTALAVGCOUNT_SUCCESS) {
        return {...state, totalAvg_loading: false,  totalAvg: action.payload}
    }

    if(action.type === GET_TOTALSALES_BEGIN) {
        return {...state, totalSales_loading: true, totalSales_error: false}
    }

    if(action.type === GET_TOTALSALES_ERROR) {
        return {...state, totalSales_loading: false, totalSales_error: true}
    }

    if(action.type === GET_TOTALSALES_SUCCESS) {
        return {...state, totalSales_loading: false, totalSales: action.payload}
    }

    throw new Error(`No matching "${action.type}" - action type`);

};

export default orderStatus_reducer;