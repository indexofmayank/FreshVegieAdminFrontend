import React, {useContext, useEffect, useReducer} from "react";
import axios from "axios";
import reducer from '../reducers/user_detail_reducer';
import {get_orderLogs_url, get_userOrderHistory_url, get_userTransaction_url, get_userCardInfo_url, getUserAllAddress_url} from '../utils/constants';
import {
    GET_USERLOGS_BEGIN,
    GET_USERLOGS_ERROR,
    GET_USERLOGS_SUCCESS,
    GET_ORDERHISTORY_BEGIN,
    GET_ORDERHISTORY_ERROR,
    GET_ORDERHISTORY_SUCCESS,
    GET_USERTRANSACTION_BEGIN,
    GET_USERTRANSACTION_ERROR,
    GET_USERTRANSACTION_SUCCESS,
    GET_USERDETAILCARDINFO_BEGIN,
    GET_USERDETAILCARDINFO_ERROR,
    GET_USERDETAILCARDINFO_SUCCESS,
    GET_ALLUSERADDRESS_BEGIN,
    GET_ALLUSERADDRESS_ERROR,
    GET_ALLUSERADDRESS_SUCCESS,
    
  
} from '../actions';

const initialState = {
    userOrderLogs_loading: false,
    userOrderLogs_error: false,
    userOrderLogs: {},
    userOrderHistory_loading: false,
    userOrderHistory_error: false,
    userOrderHistory: [],
    userTransaction_loading: false,
    userTransaction_error: false,
    userTransactions: [],
    userDetailCardInfo_loading: false,
    userDetailCardInfo_error: false,
    userDetailCardInfo: {},
    userAllAddress_loading: false,
    userAllAddress_error: false,
    userAllAddress: {}
  
};


const UserDetailContext = React.createContext();
export const UserDetailProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchUserOrderLogs = async (id, page='', limit='') => {
        dispatch({type:GET_USERLOGS_BEGIN });
        try {
            const respone = await axios.get(`${get_orderLogs_url}${id}?page=${page}&limit=${limit}`);
            const {data} = respone;
            dispatch({type: GET_USERLOGS_SUCCESS, payload: data});
        } catch (error) {
            console.log(error);
            dispatch({type: GET_USERLOGS_ERROR });
        }
    };

    const fetchUserOrderHistroy = async (id, page='') => {
        dispatch({type: GET_ORDERHISTORY_BEGIN});
        try {
            const respone = await axios.get(`${get_userOrderHistory_url}${id}?page=${page}`);
            const {data} = respone;
            dispatch({type: GET_ORDERHISTORY_SUCCESS, payload: data});
        } catch (error) {
            console.log(error);
            dispatch({type: GET_ORDERHISTORY_ERROR})
        }
    };

    const getUserTransaction = async (id, page='') => {
        dispatch({type: GET_USERTRANSACTION_BEGIN});
        try {
            const respone = await axios.get(`${get_userTransaction_url}${id}?page=${page}`);
            const {data} = respone;
            dispatch({type: GET_USERTRANSACTION_SUCCESS, payload: data});
        } catch (error) {
            console.log(error);
            dispatch({type: GET_USERTRANSACTION_ERROR});
        }
    };

    const fetchUserSingleCardInfo = async (id) => {
        dispatch({type: GET_USERDETAILCARDINFO_BEGIN});
        try {
            const respone = await axios.get(`${get_userCardInfo_url}${id}`);
            const {data} = respone;
            dispatch({type: GET_USERDETAILCARDINFO_SUCCESS, payload: data});
        } catch (error) {
            console.log(error);
            dispatch({type: GET_USERDETAILCARDINFO_ERROR})
        }
    }

    const fetchUserAllAddress = async(id, page='') => {
        try {
          dispatch({type: GET_ALLUSERADDRESS_BEGIN});
          const response = await axios.get(`${getUserAllAddress_url}${id}?page=${page}`);
          const {data} = response;
          dispatch({type: GET_ALLUSERADDRESS_SUCCESS, payload: data});
        } catch (error) {
          dispatch({type: GET_ALLUSERADDRESS_ERROR});
        }
      }
    

    return (
    <UserDetailContext.Provider 
        value={{
            ...state,
            fetchUserOrderLogs,
            fetchUserOrderHistroy,
            getUserTransaction,
            fetchUserSingleCardInfo,
            fetchUserAllAddress
        }}
    >
        {children}
    </UserDetailContext.Provider>    
    );

};

export const useUserDetailProviderContext = () => {
    return useContext(UserDetailContext)
};