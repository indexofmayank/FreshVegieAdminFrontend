import React, {useContext, useEffect, useReducer} from "react";
import axios from "axios";
import reducer from '../reducers/user_detail_reducer';
import {get_orderLogs_url} from '../utils/constants';
import {
    GET_USERLOGS_BEGIN,
    GET_USERLOGS_ERROR,
    GET_USERLOGS_SUCCESS
} from '../actions';

const initialState = {
    userDetail_loading: false,
    userDetail_error: false,
    userDetails: []
};


const UserDetailContext = React.createContext();
export const UserDetailProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchUserDetail = async (id) => {
        console.log(id);
        dispatch({type:GET_USERLOGS_BEGIN });
        try {
            const respone = await axios.get(`${get_orderLogs_url}${id}`);
            const {data} = respone.data;
            console.log(data);
            dispatch({type: GET_USERLOGS_SUCCESS, payload: data});
        } catch (error) {
            console.log(error);
            dispatch({type:GET_USERLOGS_ERROR })
        }
    };

    return (
    <UserDetailContext.Provider 
        value={{
            ...state,
            fetchUserDetail
        }}
    >
        {children}
    </UserDetailContext.Provider>    
    );

};

export const useUserDetailProviderContext = () => {
    return useContext(UserDetailContext)
};