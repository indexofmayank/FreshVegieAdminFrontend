import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/customer_reducer';

import {
    customers_url, delete_customer_url,userListingforAddorder
} from '../utils/constants';

import {
    GET_CUSTOMER_BEGIN,
    GET_CUSTOMER_ERROR,
    GET_CUSTOMER_SUCCESS,
    GET_CUSTOMERORDER_BEGIN,
    GET_CUSTOMERORDER_ERROR,
    GET_CUSTOMERORDER_SUCCESS
} from '../actions';

const initialState = {
    customer_loading: false,
    customer_error: false,
    customers: [],
    customerwithaddress_loading: false,
    customerwithaddress_error: false,
    customerwithaddress:[]
};

const CustomerContext = React.createContext();

export const CustomerProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCustomers = async (newPage, limit) => {
        dispatch({type: GET_CUSTOMER_BEGIN});
        try{
            const response = await axios.get(customers_url)
            const {data} = response;
            dispatch({type: GET_CUSTOMER_SUCCESS, payload: data});
        } catch(error) {
            dispatch({type: GET_CUSTOMER_ERROR});
        }
    };

    const fetchuserListingforAddorder = async () => {
        dispatch({type: GET_CUSTOMERORDER_BEGIN});
        try{
            const response = await axios.get(userListingforAddorder)
            const {data} = response.data;
            dispatch({type: GET_CUSTOMERORDER_SUCCESS, payload: data});
        } catch(error) {
            dispatch({type: GET_CUSTOMERORDER_ERROR});
        }
    };

    useEffect(() => {
        fetchCustomers();
        fetchuserListingforAddorder();
    }, []);

    return (
        <CustomerContext.Provider
            value={{
                ...state,
                fetchCustomers,
                fetchuserListingforAddorder
            }}
        >
            {children}
        </CustomerContext.Provider>
    );
};


export const useCustomerContext = () => {
    return useContext(CustomerContext);
}