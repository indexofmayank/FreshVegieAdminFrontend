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
  updateOrderStatusToDelivered,
  getDeliveryPartnerName_url,
  updateDeliveryPartnerDetails_url,
  getDeliveryPartnerDetailById_url,
  getOrderForTable_url,
  getRecentOrderForTable_url,
  createOrder_url,
  getOrderForEditOrder_url,
  getStaticDeliveryInstructionsInfo_url,
  getCustomiseOrderDetail_url,
  updateAdminOrder_url,
  getUserBalanceFromWallet_url,
  updateUserBalanceForWallet_url,
  getOrderIdByCustomOrderId_url,
  getOrderDateByOrderId_url
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
  GET_SINGLEORDERSTATUS_SUCCESS,
  GET_DELIVERYPARTNERBYNAME_BEGIN,
  GET_DELIVERYPARTNERBYNAME_ERROR,
  GET_DELIVERYPARTNERBYNAME_SUCCESS,
  GET_ORDERFORTABEL_BEGIN,
  GET_ORDERFORTABEL_SUCCESS,
  GET_ORDERFORTABLE_ERROR,
  GET_RECENTORDERFORTABLE_BEGIN,
  GET_RECENTORDERFORTABLE_ERROR,
  GET_RECENTORDERFORTABLE_SUCCESS,
  CREATE_NEW_ORDER,
  GET_ORDERFOREDIT_BEGIN,
  GET_ORDERFOREDIT_ERROR,
  GET_ORDERFOREDIT_SUCCESS,
  GET_ORDERFORCUSTOMISE_BEGIN,
  GET_ORDERFORCUSTOMISE_ERROR,
  GET_ORDERFORCUSTOMISE_SUCCESS,
  GET_CUSTOMORDERIDFROM_ID_SUCCESS,
  GET_CUSTOMORDERIDFROM_ID_ERROR,
  GET_CUSTOMORDERIDFROM_ID_BEGIN,
  GET_ORDERDATE_BEGIN,
  GET_ORDERDATE_ERROR,
  GET_ORDERDATE_SUCCESS
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
  deliveryPartner_loading: false,
  deliveryPartner_error: false,
  deliveryPartner: [],
  orderForTable_loading: false,
  orderForTable_error: false,
  orderForTable: [],
  recentOrder_loading: false,
  recentOrder_error: false,
  recentOrder: [],
  orderForEditOrder_loading: false,
  orderForEditOrder_error: false,
  orderForEditOrder: [],
  orderForCustomise_loading: false,
  orderForCustomise_error: false,
  orderForCustomise: {},
  new_order_address: {
    address_name: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    locality: '',
    landmark: '',
    city: '',
    pin_code: '',
    state: ''
  },
  pending_orders: 0,
  delivered_orders: 0,
  total_revenue: 0,
  orderIdBy_customOrderId: '',
  orderIdBy_customOrderId_loading: false,
  orderIdBy_customOrderId_error: false,
  orderDate_loading: false,
  orderDate_error: false,
  orderDate: {}
};

const OrderContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const { currentUser } = useUserContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchOrdersForTable = async (page='', limit='', status='', label='') => {
    try {
      dispatch({type:GET_ORDERFORTABEL_BEGIN });
      const response = await axios.get(`${getOrderForTable_url}?label=${label}&page=${page}&limit=${limit}`);
      const {data} = response;
      dispatch({type: GET_ORDERFORTABEL_SUCCESS, payload: data});
    } catch (error) {
      console.error(error);
      dispatch({type: GET_ORDERFORTABLE_ERROR});
    }
  }

  const fetchRecentOrderForTable = async () => {
    try {
      dispatch({type:GET_RECENTORDERFORTABLE_BEGIN });
      const response = await axios.get(getRecentOrderForTable_url);
      const {data} = response.data;
      dispatch({type: GET_RECENTORDERFORTABLE_SUCCESS, payload: data});
    } catch (error) {
      console.error(error);
      dispatch({type: GET_RECENTORDERFORTABLE_ERROR});
    }
  }

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
      console.log(response?.data);
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

  const updateDeliveryInfo = async (id, type, name, email, phone, _id) => {
    try {
      const response = await axios.put(`${updateDeliveryPartnerDetails_url}${id}`, {
        type,
        name,
        phone,
        email,
        _id
      });
      const {success, data} = response.data;
      fetchOrders();
      fetchUserOrderDeliveryInfo(id);
      return {success, data};
    } catch (error) {
      const {success, message} = error.response.data;
      return {success, message};
    }
  }


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

  const updateNewOrderAddressDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    dispatch({type: CREATE_NEW_ORDER, payload: {name, value}});
  }

  const fetchCustomOrderId = async (id) => {
    console.log(id);
    dispatch({type: GET_CUSTOMORDERID_BEGIN});
    try {
      const response = await axios.get(`${get_customOrderId_url}${id}`);
      console.log(response);
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

  const fetchDeliveryPartnersName = async () => {
    dispatch({type: GET_DELIVERYPARTNERBYNAME_BEGIN});
    try {
      const response = await axios.get(getDeliveryPartnerName_url);
      const {data} = response.data;
      dispatch({type: GET_DELIVERYPARTNERBYNAME_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: GET_DELIVERYPARTNERBYNAME_ERROR});
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

  const deliveryPartnerDetailById = async (id) => {
    try {
      const response = await axios.get(`${getDeliveryPartnerDetailById_url}${id}`);
      const {data} = response.data;
      return data;
    } catch (error) {
      const {success, message} = error;
      return {success, message};
    }
  }

  const createNewOrder = async (orderItems, user, shippingInfo, orderedFrom, discountPrice, itemPrice, paymentInfo, deliveryInfo ) => {
    try {
      const response = await axios.post(`${createOrder_url}`, {
        orderItems,
        shippingInfo,
        user,
        orderedFrom,
        discountPrice,
        itemPrice,
        paymentInfo,
        deliveryInfo
      });
      const {success, message} = response.data;
      return {success, message};
    } catch (error) {
      const {success, message} = error;
      return {success, message};
    }
  }

  const fetchOrderForEditOrder = async(id) => {
      dispatch({type: GET_ORDERFOREDIT_BEGIN });
    try {
      const response = await axios.get(`${getOrderForEditOrder_url}${id}`);
      const {data} = response.data;
      dispatch({type: GET_ORDERFOREDIT_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: GET_ORDERFOREDIT_ERROR});
    }
  }

  const fetchStaticDeliveryInstructionsInfo = async() => {
    try {
      const response = await axios.get(getStaticDeliveryInstructionsInfo_url);
      const {success, data} = response.data;
      return {success, data};
    } catch (error) {
      const {message} = error.message;
      return {success: false, message};
    }
  }

  const fetchOrderForCustomise = async (id) => {
    dispatch({type: GET_ORDERFORCUSTOMISE_BEGIN});
    try {
      const response = await axios.get(`${getCustomiseOrderDetail_url}${id}`);
      console.log(response?.data?.data);
      const data = response.data?.data;
      dispatch({type: GET_ORDERFORCUSTOMISE_SUCCESS, payload: data});
      return;
    } catch (error) {
      dispatch({type: GET_ORDERFORCUSTOMISE_ERROR});
    }
  }

  const updateOrderForAdmin = async (id, orderItems, paymentInfo, discountPrice, grandTotal) => {
    try {
      const response = await axios.put(`${updateAdminOrder_url}${id}`, {
       orderItems,
       paymentInfo,
       discountPrice,
       grandTotal
      });
      const {success, message} = response.data;
      return {success, message};
    } catch (error) {
     const { message} = error;
     return {success: false, message};
    }
  }

  const fetchUserBalanceFromWallet = async (id) => {
    try {
      const response = await axios.get(`${getUserBalanceFromWallet_url}${id}`);
      const {success, balance} = response.data;
      return {success, balance}
    } catch (error) {
      const {message} = error;
      return {success: false, message}
    }
  }

  const updateUserRefundAmountToWallet = async (id, amount, orderid) => {
          try {
      const response = await axios.post(`${updateUserBalanceForWallet_url}${id}`, {
        amount,
        description: 'refund initiated for '+`${orderid}`
      });
      const {success} = response.data;
      return {success};
    } catch (error) {
      const {message} = error;
      return {success: false, message};
    }
  }

  const fetchOrderIdFromCustomOrderId = async (customOrderId) => {
    dispatch({type: GET_CUSTOMORDERIDFROM_ID_BEGIN});
    try {
      const response = await axios.get(`${getOrderIdByCustomOrderId_url}${customOrderId}`);
      const {data} = response.data;
      dispatch({type: GET_CUSTOMORDERIDFROM_ID_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: GET_CUSTOMORDERIDFROM_ID_ERROR});
    }
  }

  const fetchOrderDateByOrderId = async (id) => {
    dispatch({type: GET_ORDERDATE_BEGIN});
    try {
      const response = await axios.get(`${getOrderDateByOrderId_url}${id}`);
      const {data} = response.data;
      dispatch({type: GET_ORDERDATE_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: GET_ORDERDATE_ERROR});
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
        udpateOrderStatusAsDelivered,
        fetchDeliveryPartnersName,
        updateDeliveryInfo,
        deliveryPartnerDetailById,
        fetchOrdersForTable,
        fetchRecentOrderForTable,
        updateNewOrderAddressDetails,
        createNewOrder,
        fetchOrderForEditOrder,
        fetchStaticDeliveryInstructionsInfo,
        fetchOrderForCustomise,
        updateOrderForAdmin,
        fetchUserBalanceFromWallet,
        updateUserRefundAmountToWallet,
        fetchOrderIdFromCustomOrderId,
        fetchOrderDateByOrderId
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
