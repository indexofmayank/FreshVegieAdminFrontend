import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/orderStatus_reducer';
import {getOrderStatus_url, getTotalOrderCount_url, getTotalOrderAvgValue_url, getTotalOrderSalesCount_url} from '../utils/constants';
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

const initialState = {
    orderStatus_loading: false,
    orderStatus_error: false,
    orderStatus: {},
    totalOrder_loading: false,
    totalOrder_error: false,
    totalOrder: Number,
    totalAvg_loading: false,
    totalAvg_error: false,
    totalAvg: String,
    totalSales_loading: false,
    totalSales_error: false,
    totalSales: Number
};



const OrderStatusContext = React.createContext();
export const OrderStatusProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchOrderStatus = async(period='', startDate='', endDate='') => {
        dispatch({type: GET_ORDERSTATUS_BEGIN});
        try {
            const response = await axios.get(`${getOrderStatus_url}?period=${period}&startDate=${startDate}&endDate=${endDate}`);
            const {data} = response;
            dispatch({type: GET_ORDERSTATUS_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_ORDERSTATUS_ERROR});
        }
    }


    const fetchOrderTotalCount = async(period='', startDate='', endDate='') => {
        dispatch({type: GET_TOTALORDERCOUNT_BEGIN});
        try {
            const response = await axios.get(`${getTotalOrderCount_url}?period=${period}&startDate=${startDate}&endDate=${endDate}`);
            const {data} = response.data;
            dispatch({type: GET_TOTALORDERCOUNT_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_TOTALORDERCOUNT_ERROR});
        }
    }

    const fetchOrderAvgCount = async (period='', startDate='', endDate='') => {
        dispatch({type: GET_TOTALAVGCOUNT_BEGIN });
        try {
            const response = await axios.get(`${getTotalOrderAvgValue_url}?period=${period}&startDate=${startDate}&endDate=${endDate}`);
            const {data} = response.data;
            dispatch({type: GET_TOTALAVGCOUNT_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_TOTALAVGCOUNT_ERROR});
        }
    }

    const fetchOrderTotalStats = async (period='', startDate='', endDate='') => {
        dispatch({type: GET_TOTALSALES_BEGIN});
        try {
            const response = await axios.get(`${getTotalOrderSalesCount_url}?period=${period}&startDate=${startDate}&endDate=${endDate}`);
            const {data} = response.data;
            dispatch({type: GET_TOTALSALES_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_TOTALSALES_ERROR});
        }
    }

    return (
        <OrderStatusContext.Provider
            value={{
                ...state,
                fetchOrderStatus,
                fetchOrderTotalCount,
                fetchOrderAvgCount,
                fetchOrderTotalStats
            }}
        >
            {children}
        </OrderStatusContext.Provider>
    );
}

export const useOrderStatusContext = () => {
    return useContext(OrderStatusContext);
}