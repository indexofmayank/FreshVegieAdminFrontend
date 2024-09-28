import {
    GET_TOTALSALESFOR_DAHSBOARD_BEGIN,
    GET_TOTALSALESFOR_DASHBOARD_ERROR,
    GET_TOTALSALESFOR_DASHBOARD_SUCCESS,
    GET_TOTALDELIVEREDORDERED_BEGIN,
    GET_TOTALDELIVEREDORDERED_ERROR,
    GET_TOTALDELVIEREDORDERED_SUCCESS,
    GET_TOTALPENDINGORDER_BEGIN,
    GET_TOTALPENDINGORDER_ERROR,
    GET_TOTALPENDINGORDER_SUCCESS
} from '../actions';


const dashboard_reducer = (state, action) => {
    if(action.type === GET_TOTALSALESFOR_DAHSBOARD_BEGIN) {
        return {...state, totalSales_loading: true, totalSales_error: false}
    }

    if(action.type === GET_TOTALSALESFOR_DASHBOARD_ERROR) {
        return {...state, totalSales_loading: false, totalSales_error: true}
    }

    if(action.type === GET_TOTALSALESFOR_DASHBOARD_SUCCESS) {
        return {...state, totalSales_loading: false, totalSales: action.payload}
    }

    if(action.type === GET_TOTALDELIVEREDORDERED_BEGIN) {
        return {...state, totalDeliveredOrder_loading: true, totalDeliveredOrder_error: false}
    }

    if(action.type === GET_TOTALDELIVEREDORDERED_ERROR) {
        return {...state, totalDeliveredOrder_loading: false, totalDeliveredOrder_error: true}
    }

    if(action.type === GET_TOTALDELVIEREDORDERED_SUCCESS) {
        return {...state, totalDeliveredOrder_loading: false, totalDeliveredOrder: action.payload }
    }

    if(action.type === GET_TOTALPENDINGORDER_BEGIN) {
        return {...state, totalPendingOrder_loading: true, totalPendingOrder_error: false }
    }

    if(action.type === GET_TOTALPENDINGORDER_ERROR) {
        return {...state, totalPendingOrder_loading: false, totalPendingOrder_error: true }
    }

    if(action.type === GET_TOTALPENDINGORDER_SUCCESS) {
        return {...state, totalPendingOrder_loading: false, totalPendingOrder: action.payload}
    }
}
export default dashboard_reducer;