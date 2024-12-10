import React, { useContext, useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { login_url, auth_url, logout_url, getUserForCreateOrder_url, getUserById_url, getUserAddress_url, getMetaForCreateOrder_url, getWalletLogs_url} from '../utils/constants';
import {
  GET_USERFORCREATEORDER_BEGIN,
  GET_USERFORCREATEORDER_ERROR,
  GET_USERFORCREATEORDER_SUCCESS,
  GET_USERBYID_BEGIN,
  GET_USERBYID_ERROR,
  GET_USERBYID_SUCCESS,
  GET_USERADDRDESSES_BEGIN,
  GET_USERADDRESSES_ERROR,
  GET_USERADDRESSES_SUCCESS,
  GET_WALLETLOG_BEGIN,
  GET_WALLETLOG_ERROR,
  GET_WALLETLOG_SUCCESS
} from '../actions';
import reducer from '../reducers/user_reducer';

axios.defaults.withCredentials = true;

const initialState = {
  usernameForCreateOrder_loading: false,
  usernameForCreateOrder_error: false,
  usernameForCreateOrder: [],
  userById_loading: false,
  userById_error: false,
  userById: {},
  userAddresses: [],
  
};

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const setUser = (user) => {
    setCurrentUser(user);
  };

  const checkAuth = async () => {
    try {
      setAuthLoading(true);
      const response = await axios.post(auth_url);
      const { data } = response.data;
      setUser(data);
      setAuthLoading(false);
    } catch (error) {
      console.log(error.response);
      setAuthLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // console.log(email);
      // console.log(password);
      const response = await axios.post(login_url, { email, password });
      // console.log(email);
      // console.log(password);
      const { success, data } = response.data;
      // console.log(data);
      setUser(data);
      return { success, data };
    } catch (error) {
      const { message, success } = error.response.data;
      return { success, message };
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(logout_url);
      const { success, message } = response.data;
      setUser(null);
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const fetchUserForCreateOrder = async (name='') => {
    try {
      dispatch({type: GET_USERFORCREATEORDER_BEGIN});
      const response = await axios.get(`${getUserForCreateOrder_url}?name=${name}`);
      const {data} = response.data;
      dispatch({type:GET_USERFORCREATEORDER_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: GET_USERFORCREATEORDER_ERROR});
    }
  }

  const fetchUserById = async(id) => {
    try {
      // dispatch({type: GET_USERBYID_BEGIN});
      const response = await axios.get(`${getUserById_url}${id}`);
      const {data} = response.data;
      return data;
      // dispatch({type: GET_USERBYID_SUCCESS, payload: data});
    } catch (error) {
      // dispatch({type: GET_USERBYID_ERROR});
      throw new Error(error);
    }
  }

  const fetchUserMetaDataForCreateOrder = async (id) => {
    try {
      const response = await axios.get(`${getMetaForCreateOrder_url}${id}`);
      const {data} = response.data;
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  const fetchUserAddressById = async (id) => {
    try {
      dispatch({type: GET_USERADDRDESSES_BEGIN});
      const response = await axios.get(`${getUserAddress_url}${id}`);
      const {data} = response.data;
      console.log(data);
      dispatch({type: GET_USERADDRESSES_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: GET_USERADDRESSES_ERROR});
    }
  }

  // const fetchUserWalletLogsById = async (id) => {
  //   try {
      
  //   } catch (error) {
  //     di
  //   }
  // }


  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{...state, currentUser, authLoading, login, logout, fetchUserForCreateOrder, fetchUserById, fetchUserAddressById, fetchUserMetaDataForCreateOrder }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
