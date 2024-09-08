import React, { useContext, useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { login_url, auth_url, logout_url, getUserForCreateOrder_url } from '../utils/constants';
import {
  GET_USERFORCREATEORDER_BEGIN,
  GET_USERFORCREATEORDER_ERROR,
  GET_USERFORCREATEORDER_SUCCESS
} from '../actions';
import reducer from '../reducers/user_reducer';

axios.defaults.withCredentials = true;

const initialState = {
  usernameForCreateOrder_loading: false,
  usernameForCreateOrder_error: false,
  usernameForCreateOrder: []
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
      const response = await axios.post(login_url, { email, password });
      const { success, data } = response.data;
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

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{...state, currentUser, authLoading, login, logout, fetchUserForCreateOrder }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
