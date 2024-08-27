import React from 'react';
import {
  FaHome,
  FaProductHunt,
  FaShoppingCart,
  FaUserTie,
  FaUser,
  FaTh,
  FaAdversal,
  FaGlobe,
  FaAlignJustify
} from 'react-icons/fa';

export const LinkItems = [
  { name: 'Home', url: '/', icon: <FaHome /> },
  { name: 'Products', url: '/products', icon: <FaProductHunt /> },
  { name: 'Category', url: '/category', icon: <FaTh />},
  { name: 'Orders', url: '/orders', icon: <FaShoppingCart /> },
  { name: 'Admins', url: '/admins', icon: <FaUserTie /> },
  { name: 'Users', url: '/users', icon: <FaUser />},
  {name: 'Banners', url: '/banners', icon: <FaAdversal />},
  {name: 'GeoFancing', url: '/geoFancing', icon: <FaGlobe />},
  {name: 'Inventory', url: '/inventory', icon: <FaAlignJustify />}
];

export const orderStatusList = [
  {name: 'Accepted', value: 'accepeted'},
  {name: 'Received', value: 'received'},
  { name: 'Rejected', value: 'rejected' },
  {name: 'Packed', value: 'packed'},
  {name: 'Assign Delivery', valuel: 'assign_delivery'},
  {name: 'Cancelled', value: 'cancelled'},
  {name: 'Delivered', value: 'delivered' }
];

export const paymentStatusList = [
  {name: 'Pending', value: 'pending'},
  {name: 'Completed', value: 'completed'},
  {name: 'Failed', value: 'failed'},
  {name: 'Cancelled', value: 'cancelled'},
  {name: 'Refunded', value: 'refuned'},
  {name: 'Processing', value: 'processing'},
  {name : 'Disputed', value: 'disputed'}
];

export const domain = process.env.REACT_APP_BACKEND_HOST;
export const auth_url = `${domain}/api/admin/auth`;
export const login_url = `${domain}/api/admin/login`;
export const register_url = `${domain}/api/admin/register`;
export const logout_url = `${domain}/api/admin/logout`;
export const orders_url = `${domain}/api/admin/orders`;
export const update_product_url = `${domain}/api/admin/product/`;
export const products_url = `${domain}/api/products/`;
export const single_product_url = `${domain}/api/admin/product/`;
export const productsTable_url = `${domain}/api/admin/product/`;
export const singleProductForUpdate_url = `${domain}/api/admin/product/update/`
export const admins_url = `${domain}/api/admin/users/`;
export const single_order_url = `${domain}/api/orders/`;
export const update_order_status = `${domain}/api/admin/order/`;
export const create_new_product = `${domain}/api/admin/product/new`;
export const delete_review = `${domain}/api/admin/product/review/`;
export const customers_url = `${domain}/api/user/`;
export const delete_customer_url = `${domain}/api/admin/user/`;
export const category_url = `${domain}/api/category/`;
export const getCategoryForTable_url = `${domain}/api/admin/category/`;
export const delete_category_url = `${domain}/api/admin/category/delete/`;
export const create_category_url = `${domain}/api/category/`;
export const getAllCategoryByName_url = `${domain}/api/category/get/name/`;
export const create_banner_url = `${domain}/api/banner/`;
export const get_banner_url = `${domain}/api/banner/`;
export const udpate_banner_url = `${domain}/api/banner/`;
export const get_banner_by_id_url = `${domain}/api/banner/`;
export const delete_banner_by_id_url = `${domain}/api/banner/`;
export const geoFancing_url = `${domain}/api/polygon/`;
export const inventory_url = `${domain}/api/inventory/`;
export const get_orderWithItem_url = `${domain}/api/orders/orderItems/`;
export const get_orderLogs_url = `${domain}/api/admin/orderlogs/`;
export const get_userOrderHistory_url = `${domain}/api/orders/history/`;
export const get_userTransaction_url = `${domain}/api/user/transactions/`;
export const get_userBillingInfo_url = `${domain}/api/orders/billingInfo/`;
export const get_userPaymentInfo_url = `${domain}/api/orders/paymentInfo/`;
export const get_userDeliveryInfo_url = `${domain}/api/orders/deliveryInfo/`;
export const get_userCardInfo_url = `${domain}/api/user/metadata/`;
export const get_customOrderId_url = `${domain}/api/orders/customOrderId/`;
export const updatePaymentStatus_url = `${domain}/api/orders/paymentstatus/`;
export const get_orderQuantityWise_url = `${domain}/api/orders/quantitywise/`;
export const updatePaymentStatusToPaid_url = `${domain}/api/orders/markpaid/`;
export const updateOrderStatusToCancelled_url = `${domain}/api/admin/order/markcancelled/`;
export const getSingleOrderStatus_url = `${domain}/api/orders/orderStatus/`;
export const updateOrderStatusToDelivered = `${domain}/api/orders/markdelivered/`;