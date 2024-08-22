import React, {useContext, useEffect, useReducer} from "react";
import axios from "axios";
import reducer from '../reducers/user_detail_reducer';
import {get_orderLogs_url, get_userOrderHistory_url, get_userTransaction_url} from '../utils/constants';
import {
    GET_USERLOGS_BEGIN,
    GET_USERLOGS_ERROR,
    GET_USERLOGS_SUCCESS,
    GET_ORDERHISTORY_BEGIN,
    GET_ORDERHISTORY_ERROR,
    GET_ORDERHISTORY_SUCCESS,
    GET_USERTRANSACTION_BEGIN,
    GET_USERTRANSACTION_ERROR,
    GET_USERTRANSACTION_SUCCESS
} from '../actions';

const initialState = {
    userDetail_loading: false,
    userDetail_error: false,
    userDetails: [],
    userOrderHistory_loading: false,
    userOrderHistory_error: false,
    userOrderHistory: [],
    userTransaction_loading: false,
    userTransaction_error: false,
    userTransactions: [],
};


const UserDetailContext = React.createContext();
export const UserDetailProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchUserOrderLogs = async (id) => {
        dispatch({type:GET_USERLOGS_BEGIN });
        try {
            const respone = await axios.get(`${get_orderLogs_url}${id}`);
            const {data} = respone.data;
            console.log(data);
            dispatch({type: GET_USERLOGS_SUCCESS, payload: data});
        } catch (error) {
            console.log(error);
            dispatch({type: GET_USERLOGS_ERROR });
        }
    };

    const fetchUserOrderHistroy = async (id) => {
        dispatch({type: GET_ORDERHISTORY_BEGIN});
        try {
            const respone = await axios.get(`${get_userOrderHistory_url}${id}`);
            const {data} = respone.data;
            dispatch({type: GET_ORDERHISTORY_SUCCESS, payload: data});
        } catch (error) {
            console.log(error);
            dispatch({type: GET_ORDERHISTORY_ERROR})
        }
    };

    const getUserTransaction = async (id) => {
        dispatch({type: GET_USERTRANSACTION_BEGIN});
        try {
            const respone = await axios.get(`${get_userTransaction_url}${id}`);
            const {data} = respone.data;
            dispatch({type: GET_USERTRANSACTION_ERROR, payload: data});
        } catch (error) {
            console.log(error);
            dispatch({type: GET_USERTRANSACTION_SUCCESS});
        }

    };

    return (
    <UserDetailContext.Provider 
        value={{
            ...state,
            fetchUserOrderLogs,
            fetchUserOrderHistroy,
            getUserTransaction
        }}
    >
        {children}
    </UserDetailContext.Provider>    
    );

};

export const useUserDetailProviderContext = () => {
    return useContext(UserDetailContext)
};