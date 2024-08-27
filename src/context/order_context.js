import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/order_reducer';
import { useUserContext } from './user_context';
import {
  orders_url,
  single_order_url,
  update_order_status,
  get_orderWithItem_url,
  get_userBillingInfo_url,
  get_userPaymentInfo_url,
  get_userDeliveryInfo_url,
  get_customOrderId_url,
  updatePaymentStatus_url,
  updatePaymentStatusToPaid_url,
  get_orderQuantityWise_url,
  updateOrderStatusToCancelled_url,
  getSingleOrderStatus_url,
  updateOrderStatusToDelivered
} from '../utils/constants';
import {
  GET_ORDERS_BEGIN,
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
  GET_SINGLE_ORDER_BEGIN,
  GET_SINGLE_ORDER_ERROR,
  GET_SINGLE_ORDER_SUCCESS,
  UPDATE_ORDER_STATUS,
  GET_ORDERWITHITEM_BEGIN,
  GET_ORDERWITHITEM_SUCCESS,
  GET_ORDERWITHITEM_ERROR,
  GET_USERBILLINGINFO_BEGIN,
  GET_USERBILLINGINFO_ERROR,
  GET_USERBILLINGINFO_SUCCESS,
  GET_USERPAYMENTINFO_BEGIN,
  GET_USERPAYMENTINFNO_ERROR,
  GET_USERPAYMENTINFO_SUCCESS,
  GET_USERDELIVERYINFO_BEGIN,
  GET_USERDELIVERYINFO_ERROR,
  GET_USERDELIVERYINFO_SUCCESS,
  GET_CUSTOMORDERID_BEGIN,
  GET_CUSTOMORDERID_ERROR,
  GET_CUSTOMORDERID_SUCCESS,
  GET_QUANTITYWISEORDER_BEGIN,
  GET_QUANTITYWISEORDER_ERROR,
  GET_QUANTITYWISEORDER_SUCCESS,
  UPDATE_ORDERPAYMENT_STATUS,
  UPDATE_ORDERPAYMENTTO_PAID,
  GET_SINGLEORDERSTATUS_BEGIN,
  GET_SINGLEORDERSTATUS_ERROR,
  GET_SINGLEORDERSTATUS_SUCCESS
} from '../actions';

const initialState = {
  orders_loading: false,
  orders_error: false,
  order_withItems_loading: false,
  order_withItems_error: false,
  orders: [],
  order_withItems:   {},
  single_order_loading: false,
  single_order_error: false,
  single_order: {},
  userBillingInfo_loading: false,
  userBillingInfo_error: false,
  userBillingInfo: {},
  userPaymentInfo_loading: false,
  userPaymentInfo_error: false,
  userPaymentInfo: {},
  userDeliveryInfo_loading: false,
  userDeliveryInfo_error: false,
  userDeliveryInfo: {},
  customOrderId_loading: false,
  customOrderId_error: false,
  customOrderId: {},
  quantityWiseOrder_laoding: false,
  quantityWiseOrder_error: false,
  quantityWiseOrder: {},
  single_order_status: '',
  single_order_payment_status: '',
  singleOrderStatus_loading: false,
  singleOrderStatus_error: false,
  singleOrderStatus: {},
  recent_orders: [],
  pending_orders: 0,
  delivered_orders: 0,
  total_revenue: 0,
};

const OrderContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const { currentUser } = useUserContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchOrders = async () => {
    dispatch({ type: GET_ORDERS_BEGIN });
    try {
      const response = await axios.get(orders_url);
      const { data } = response.data;
      dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ORDERS_ERROR });
    }
  };

  const fetchSingleOrder = async (id) => {
    dispatch({ type: GET_SINGLE_ORDER_BEGIN });
    try {
      const response = await axios.get(`${single_order_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_ORDER_ERROR });
    }
  };

  const fetchOrderWithItems = async(id) => {
    dispatch({type: GET_ORDERWITHITEM_BEGIN});
    try { 
      const response = await axios.get(`${get_orderWithItem_url}${id}`);
      const {data} = response.data;
      dispatch({type: GET_ORDERWITHITEM_SUCCESS, payload: data});
    } catch(error) {
      dispatch({type: GET_ORDERWITHITEM_ERROR});
    }
  };

  const fetchUserOrderBillingInfo = async (id) => {
    dispatch({type: GET_USERBILLINGINFO_BEGIN});
    try {
      const response = await axios.get(`${get_userBillingInfo_url}${id}`);
      const {data} = response;
      dispatch({type: GET_USERBILLINGINFO_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: GET_USERBILLINGINFO_ERROR});
    }
  }

  const fetchUserOrderPaymentInfo = async (id) => {
    dispatch({type: GET_USERBILLINGINFO_BEGIN});
    try {
      const response = await axios.get(`${get_userPaymentInfo_url}${id}`);
      const {data} = response;
      dispatch({type: GET_USERPAYMENTINFO_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: GET_USERBILLINGINFO_ERROR});
    }
  }  

  const fetchUserOrderDeliveryInfo = async (id) => {
    dispatch({type: GET_USERDELIVERYINFO_BEGIN});
    try {
      const response = await axios.get(`${get_userDeliveryInfo_url}${id}`);
      const {data} = response;
      dispatch({type: GET_USERDELIVERYINFO_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: GET_USERDELIVERYINFO_ERROR});
    }
  }


  const updateOrderStatus = async (status, id) => {
    try {
      const response = await axios.put(`${update_order_status}${id}`, {
        status,
      });
      const { success, data } = response.data;
      dispatch({ type: UPDATE_ORDER_STATUS, payload: data.orderStatus });
      fetchOrders();
      return { success, status: data.orderStatus };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };


  const deleteOrder = async (id) => {
    try {
      const response = await axios.delete(`${update_order_status}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const fetchCustomOrderId = async (id) => {
    dispatch({type: GET_CUSTOMORDERID_BEGIN});
    try {
      const response = await axios.get(`${get_customOrderId_url}${id}`);
      const {data} = response;
      dispatch({type: GET_CUSTOMORDERID_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: GET_CUSTOMORDERID_ERROR});
    }
  };

  const updateOrderPaymentStatus = async (id, updateStatus) => {
    try {
      const response = await axios.put(`${updatePaymentStatus_url}${id}`,{
        "status" : updateStatus
      });
      const {success, message} = response.data;
      fetchUserOrderPaymentInfo(id);
      return {success, message};
    } catch (error) {
      const {success, message} = error;
      return {success, message};
    }
  }

  const fetchQuantityWiseOrder = async (id) => {
    dispatch({type: GET_QUANTITYWISEORDER_BEGIN});
    try {
      const response = await axios.get(`${get_orderQuantityWise_url}${id}`);
      const {data} = response;
      dispatch({type: GET_QUANTITYWISEORDER_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: GET_QUANTITYWISEORDER_ERROR});
    }
  }

  const markOrderPaymentToPaid = async (id, amount) => {
    try {
      const response = await axios.put(`${updatePaymentStatusToPaid_url}${id}`, {
        'amount': amount
      });
      const {data} = response;
      fetchUserOrderPaymentInfo(id);
      return data;
    } catch (error) {
      const {success, message} = error;
      return {success, message};
    }
  }

  const updateOrderStatusToCancelled = async (id) => {
    try {
      const response = await axios.put(`${updateOrderStatusToCancelled_url}${id}`);
      const {data} = response;
      fetchUserOrderDeliveryInfo(id);
      fetchUserOrderDeliveryInfo(id);
      return data;
    } catch (error) {
      const {success, message} = error;
      return  {success, message};
    }
  }

  const fetchSingleOrderStatus = async (id) => {
    dispatch({type: GET_SINGLEORDERSTATUS_BEGIN});
    try {
      const response = await axios.get(`${getSingleOrderStatus_url}${id}`);
      const {data} = response;
      dispatch({type: GET_SINGLEORDERSTATUS_SUCCESS, payload: data});
    } catch (error) {
      const {success, message} = error;
      dispatch({type: GET_SINGLEORDERSTATUS_ERROR});
    }
  } 

  const udpateOrderStatusAsDelivered = async (id) => {
    try {
      const response = await axios.put(`${updateOrderStatusToDelivered}${id}`);
      const {success, message} = response.data;
      fetchUserOrderDeliveryInfo(id);
      return {success, message};
    } catch (error) {
      const {success, message} = error;
      return {success, message};
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [currentUser]);

  return (
    <OrderContext.Provider
      value={{
        ...state,
        fetchOrders,
        fetchSingleOrder,
        updateOrderStatus,
        deleteOrder,
        fetchOrderWithItems,
        fetchUserOrderBillingInfo,
        fetchUserOrderPaymentInfo,
        fetchUserOrderDeliveryInfo,
        fetchCustomOrderId,
        fetchQuantityWiseOrder,
        updateOrderPaymentStatus,
        markOrderPaymentToPaid,
        updateOrderStatusToCancelled,
        fetchSingleOrderStatus,
        udpateOrderStatusAsDelivered
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
