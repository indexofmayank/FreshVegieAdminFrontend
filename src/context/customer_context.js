import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/customer_reducer';

import {
    customers_url, delete_customer_url
} from '../utils/constants';

import {
    GET_CUSTOMER_BEGIN,
    GET_CUSTOMER_ERROR,
    GET_CUSTOMER_SUCCESS
} from '../actions';

const initialState = {
    customer_loading: false,
    customer_error: false,
    customers: [],
};

const CustomerContext = React.createContext();

export const CustomerProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCustomers = async () => {
        dispatch({type: GET_CUSTOMER_BEGIN});
        try{
            const response = await axios.get(customers_url)
            const {data} = response.data;
            console.log(response);
            dispatch({type: GET_CUSTOMER_SUCCESS, payload: data});
        } catch(error) {
            dispatch({type: GET_CUSTOMER_ERROR});
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <CustomerContext.Provider
            value={{
                ...state,
                fetchCustomers,
            }}
        >
            {children}
        </CustomerContext.Provider>
    );
};


export const useCustomerContext = () => {
    return useContext(CustomerContext);
}