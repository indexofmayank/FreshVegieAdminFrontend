import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/dashboard_reducer';
import {getDashBoardTotalSales, getTotalDeliveredOrderNumber_url, getTotalPendingOrderNumber_url, getOrdersForDashboardCard_url} from '../utils/constants';

import {
    GET_TOTALSALESFOR_DAHSBOARD_BEGIN,
    GET_TOTALSALESFOR_DASHBOARD_ERROR,
    GET_TOTALSALESFOR_DASHBOARD_SUCCESS,
    GET_TOTALDELIVEREDORDERED_BEGIN,
    GET_TOTALDELIVEREDORDERED_ERROR,
    GET_TOTALDELVIEREDORDERED_SUCCESS,
    GET_TOTALPENDINGORDER_BEGIN,
    GET_TOTALPENDINGORDER_ERROR,
    GET_TOTALPENDINGORDER_SUCCESS,
    GET_ALLORDERFORDASHBOARD_BEGIN,
    GET_ALLORDERFORDASHBOARD_ERROR,
    GET_ALLORDERFORDASHOARD_SUCCESS
} from '../actions';

const initailState = {
    totalSales_loading: false,
    totalSales_error: false,
    totalSales: {},
    totalDeliveredOrder_loading: false,
    totalDeliveredOrder_error: false,
    totalDeliveredOrder: {},
    totalPendingOrder_loading: false,
    totalPendingOrder_error: false,
    totalPendingOrder: {},
    allOrdersForDashboardTable_loading: false,
    allOrdersForDashboardTable_error: false,
    allOrdersForDashbaordTable: {}
};

const DashboardContext = React.createContext();
export const DashboardProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initailState);

    const fetchTotalOrderCount = async () => {
        try { 
        dispatch({type: GET_TOTALSALESFOR_DAHSBOARD_BEGIN});
        const response = await axios.get(getDashBoardTotalSales);
        const {data} = response.data
        dispatch({type: GET_TOTALSALESFOR_DASHBOARD_SUCCESS, payload: response});
        } catch (error) {
            dispatch({type: GET_TOTALSALESFOR_DASHBOARD_ERROR});
        }
    }

    const fetchTotalDeliveredOrder = async () => {
        try {
            dispatch({type: GET_TOTALDELIVEREDORDERED_BEGIN});
            const response = await axios.get(getTotalDeliveredOrderNumber_url);
            const {data} = response.data;
            dispatch({type: GET_TOTALDELVIEREDORDERED_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_TOTALDELIVEREDORDERED_ERROR});

        }
    }

    const fetchTotalPendingOrder = async () => {
        try {
            dispatch({type: GET_TOTALPENDINGORDER_BEGIN});
            const response = await axios.get(getTotalPendingOrderNumber_url)
            const {data} = response.data;
            dispatch({type: GET_TOTALPENDINGORDER_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_TOTALPENDINGORDER_ERROR});
        }
    }

    const fetchOrderDashboardTable = async(page='', limit='', status='', label) => {
        try {
            dispatch({type: GET_ALLORDERFORDASHBOARD_BEGIN});
            const response = await axios.get(`${getOrdersForDashboardCard_url}?page=${page}&limit=${limit}&status=${status}`);
            const {data} = response;
            dispatch({type: GET_ALLORDERFORDASHOARD_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_ALLORDERFORDASHBOARD_ERROR});
        }
    } 

    return (
        <DashboardContext.Provider
            value={{
                ...state,
                fetchTotalOrderCount,
                fetchTotalDeliveredOrder,
                fetchTotalPendingOrder,
                fetchOrderDashboardTable
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => {
    return useContext(DashboardContext)
}