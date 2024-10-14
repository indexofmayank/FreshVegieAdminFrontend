import {
  GET_ORDERS_BEGIN,
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
  GET_SINGLE_ORDER_BEGIN,
  GET_SINGLE_ORDER_ERROR,
  GET_SINGLE_ORDER_SUCCESS,
  UPDATE_ORDER_STATUS,
  GET_ORDERWITHITEM_BEGIN,
  GET_ORDERWITHITEM_ERROR,
  GET_ORDERWITHITEM_SUCCESS,
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
  GET_ORDERFOREDIT_SUCCESS
} from '../actions';

const order_reducer = (state, action) => {
  if (action.type === GET_ORDERS_BEGIN) {
    return { ...state, orders_error: false, orders_loading: true };
  }
  if (action.type === GET_ORDERS_ERROR) {
    return { ...state, orders_error: true, orders_loading: false };
  }
  if (action.type === GET_ORDERS_SUCCESS) {
    // const orders = action.payload;
    // let recent_orders = action.payload;
    // recent_orders = recent_orders
    //   .sort((a, b) => {
    //     return new Date(b.createdAt) - new Date(a.createdAt);
    //   })
    //   .slice(0, 11);
    // const pending_orders = orders.filter(
    //   (order) => order.orderStatus === 'processing'
    // );
    // const delivered_orders = orders.filter(
    //   (order) => order.orderStatus === 'delivered'
    // );
    // const total_revenue = orders.reduce((total, order) => {
    //   total += order.totalPrice;
    //   return total;
    // }, 0);

    return {
      ...state,
      orders_loading: false,
      orders: action.payload,
    };
  }

  if(action.type === CREATE_NEW_ORDER) {
    const {name, value} = action.payload;
    return {...state, new_order_address: {...state.new_order_address, [name]: value}};
  }

  if (action.type === GET_SINGLE_ORDER_BEGIN) {
    return { ...state, single_order_error: false, single_order_loading: true };
  }
  if (action.type === GET_SINGLE_ORDER_ERROR) {
    return { ...state, single_order_loading: false, single_order_error: true };
  }
  if (action.type === GET_SINGLE_ORDER_SUCCESS) {
    return {
      ...state,
      single_order_loading: false,
      single_order: action.payload,
      single_order_status: action.payload.orderStatus,
    };
  }
  if (action.type === UPDATE_ORDER_STATUS) {
    return { ...state, single_order_status: action.payload };
  }

  if (action.type === UPDATE_ORDERPAYMENT_STATUS) {
    return {...state, single_order_payment_status: action.payload}
  }

  if(action.type === GET_ORDERWITHITEM_BEGIN) {
    return {...state, order_withItem_loading: true, order_withItem_error: false};
  }
  if(action.type === GET_ORDERWITHITEM_ERROR) {
    return {...state, order_withItem_loading: false, order_withItem_error: true};
  }
  if(action.type === GET_ORDERWITHITEM_SUCCESS) {
    return {...state, order_withItem_loading: false, order_withItem_error: false, order_withItems: action.payload}
  }
  if(action.type === GET_USERBILLINGINFO_BEGIN) {
    return {...state, userBillingInfo_loading: true,   userBillingInfo_error: false
    }
  }
  if(action.type === GET_USERBILLINGINFO_ERROR) {
    return {...state, userBillingInfo_loading: false, userBillingInfo_error: true}
  }
  if(action.type === GET_USERBILLINGINFO_SUCCESS) {
    return {...state, userBillingInfo_error: false, userBillingInfo: action.payload}
  }
  if(action.type === GET_USERPAYMENTINFO_BEGIN) {
    return {...state, userPaymentInfo_loading: true, userPaymentInfo_error: false}
  }
  if(action.type === GET_USERPAYMENTINFNO_ERROR) {
    return {...state, userPaymentInfo_loading: false, userPaymentInfo_error: true}
  }
  if(action.type === GET_USERPAYMENTINFO_SUCCESS) {
    return {...state, userPaymentInfo_loading: false, userPaymentInfo: action.payload}
  }
  if(action.type === GET_USERDELIVERYINFO_BEGIN) {
    return {...state, userDeliveryInfo_loading: true, userDeliveryInfo_error: false}
  }
  if(action.type === GET_USERDELIVERYINFO_ERROR) {
    return {...state, userDeliveryInfo_loading: false, userDeliveryInfo_error: true}
  }
  if(action.type === GET_USERDELIVERYINFO_SUCCESS) {
    return {...state, userDeliveryInfo_loading: false, userDeliveryInfo: action.payload}
  }
  if(action.type === GET_CUSTOMORDERID_BEGIN) {
    return {...state, customOrderId_loading: true, customOrderId_error: false }
  }
  if(action.type === GET_CUSTOMORDERID_ERROR){
    return {...state, customOrderId_loading: false, customOrderId_error: true }
  }
  if(action.type === GET_CUSTOMORDERID_SUCCESS) {
    return {...state, customOrderId_loading: false, customOrderId: action.payload}
  }
  if(action.type === GET_QUANTITYWISEORDER_BEGIN) {
    return {...state, quantityWiseOrder_laoding: true, quantityWiseOrder_error: false }
  }
  if(action.type === GET_QUANTITYWISEORDER_ERROR) {
    return {...state, quantityWiseOrder_laoding: false, quantityWiseOrder_error: true}
  }
  if(action.type === GET_QUANTITYWISEORDER_SUCCESS) {
    return {...state, quantityWiseOrder_laoding: false,  quantityWiseOrder: action.payload}
  }
  if(action.type === GET_SINGLEORDERSTATUS_BEGIN ) {
    return {...state, singleOrderStatus_loading: true, singleOrderStatus_error: false }
  }
  if(action.type === GET_SINGLEORDERSTATUS_ERROR) {
    return {...state, singleOrderStatus_loading: false, singleOrderStatus_error: true}
  }
  if(action.type === GET_SINGLEORDERSTATUS_SUCCESS) {
    return {...state, singleOrderStatus_loading: false, singleOrderStatus: action.payload}
  }
  if(action.type === GET_DELIVERYPARTNERBYNAME_BEGIN) {
    return {...state, deliveryPartner_loading: true,  deliveryPartner_error: false}
  }
  if(action.type === GET_DELIVERYPARTNERBYNAME_ERROR) {
    return {...state, deliveryPartner_loading: false, deliveryPartner_error: true}
  }
  if(action.type === GET_DELIVERYPARTNERBYNAME_SUCCESS) {
    return {...state, deliveryPartner_loading: false,  deliveryPartner: action.payload}
  }

  if(action.type === GET_ORDERFORTABEL_BEGIN) {
    return {...state, orderForTable_loading: true, orderForTable_error: false}
  }

  if(action.type === GET_ORDERFORTABLE_ERROR) {
    return {...state, orderForTable_loading: false, orderForTable_error: true}
  }

  if(action.type === GET_ORDERFORTABEL_SUCCESS) {
    return {...state,  orderForTable_loading: false, orderForTable: action.payload}
  }

  if(action.type === GET_RECENTORDERFORTABLE_BEGIN) {
    return {...state, recentOrder_loading: true, recentOrder_error: false}
  }

  if(action.type === GET_RECENTORDERFORTABLE_ERROR) {
    return {...state, recentOrder_loading: false, recentOrder_error: true }
  }

  if(action.type === GET_RECENTORDERFORTABLE_SUCCESS) {
    return {...state, recentOrder_loading: false, recentOrder: action.payload}
  }

  if(action.type === GET_ORDERFOREDIT_BEGIN) {
    return {...state, orderForEditOrder_loading: true, orderForEditOrder_error: false }
  }

  if(action.type === GET_ORDERFOREDIT_ERROR) {
    return {...state, orderForEditOrder_loading: false, orderForEditOrder_error: true}
  }

  if(action.type === GET_ORDERFOREDIT_SUCCESS) {
    return {...state, orderForEditOrder_loading: false, orderForEditOrder: action.payload}
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default order_reducer;
