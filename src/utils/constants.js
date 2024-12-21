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
  FaAlignJustify,
  FaRocketchat,
  FaIdeal,
  FaRoad,
  FaAtom
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
  {name: 'Inventory', url: '/inventory', icon: <FaAlignJustify />},
  {name: 'Notification', url: '/notification', icon: <FaRocketchat />},
  {name: 'Deal of the day', url: '/dealoftheday', icon: <FaIdeal />},
  {name: 'Delivery instructions', url: '/deliveryinstruction', icon: <FaRoad />},
  {name: 'Assets', url: '/assets', icon: <FaAtom />}
];

export const orderStatusList = [
  {name: 'Select status', value: null},
  {name: 'Accepted', value: 'accepted'},
  {name: 'Processing', value: 'processing'},
  {name: 'Packed', value: 'packed'},
  {name: 'Assigned delivery', value: 'assign_delivery'},
  {name: 'Out for delivery', value: 'out for delivery'},
  {name: 'Transit', value: 'transit'},
  {name: 'Delivered', value: 'delivered'},
  {name: 'Verifying Payment', value: 'verifying payment'},
  {name: 'Canceled', value: 'canceled'},
  {name: 'Failed', value: 'failed'}
];

export const paymentStatusList = [
  {name: 'Pending', value: 'pending'},
  {name: 'Completed', value: 'completed'},
  {name: 'Failed', value: 'failed'},
  {name: 'Canceled', value: 'canceled'},
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
export const userListingforAddorder = `${domain}/api/dealoftheday/featuredProduct1`;
export const getAllProductForOrder_url = `${domain}/api/dealoftheday/getAllProductForOrder`;
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
export const getProductByNameForInventory = `${domain}/api/inventory/product-dropdown/`;
export const createNewNotification_url = `${domain}/api/notification/`;
export const getAllNotification_url = `${domain}/api/notification/`;            
export const getAllProductName_url = `${domain}/api/notification/products/name`;
export const getAllCategoryName_url = `${domain}/api/notification/category/name`;
export const getAllUserName_url = `${domain}/api/notification/user/name`;
export const getSingleNotification_url = `${domain}/api/notification/`;
export const getDeliveryPartnerName_url = `${domain}/api/deliveryPartner`;
export const updateDeliveryPartnerDetails_url = `${domain}/api/orders/deliverypartnerdetails/`;
export const getDeliveryPartnerDetailById_url = `${domain}/api/deliveryPartner/`;
export const getCsvDownload_url = `${domain}/api/csv/`;
export const getcategoryCsvDownload_url = `${domain}/api/category/exportcategorydata`;
export const getproductCsvDownload_url = `${domain}/api/products/exportproductdata`;
export const getproductinventoryCsvDownload_url = `${domain}/api/products/exportproductinventorydata`;
export const getuserCsvDownload_url = `${domain}/api/user/exportusercsv`;
export const getOrderStatus_url = `${domain}/api/orderstatus/`;
export const getTotalOrderCount_url = `${domain}/api/orderstatus/count/`;
export const getTotalOrderAvgValue_url = `${domain}/api/orderstatus/average/`;
export const getTotalOrderSalesCount_url = `${domain}/api/orderstatus/totalsales/`;
export const getOrderForTable_url = `${domain}/api/ordertable/ordertablelabelwise`;
export const getRecentOrderForTable_url = `${domain}/api/ordertable/ordertableforrecent`;
export const getProductForCreateOrder_url = `${domain}/api/products/dropdown/getProductForCreateOrder`;
export const getUserForCreateOrder_url = `${domain}/api/user/dropdown/createOrder`;
export const getUserById_url = `${domain}/api/user/`;
export const createOrder_url = `${domain}/api/orders/new`;
export const getUserAddress_url = `${domain}/api/user/address-for-create-order/`;
export const getMetaForCreateOrder_url = `${domain}/api/user/meta-data-for-create-order/`;
export const getDealOfTheDayForTable_url = `${domain}/api/dealoftheday/`;
export const getProductDropdown_url = `${domain}/api/products/dropdown-name/name/`;
export const getFeaturedProductForTable_url = `${domain}/api/dealoftheday/featuredProduct/`;
export const getDealOfTheDay_url = `${domain}/api/dealoftheday/featuredProduct/`;
export const getSingleDealOfTheDay_url = `${domain}/api/dealoftheday/singlefeaturedProduct/`;
export const updateDealOfTheDay_url = `${domain}/api/dealoftheday/featureProduct/`;
export const getDashBoardTotalSales = `${domain}/api/dashboard/totalsales/`;
export const getTotalDeliveredOrderNumber_url = `${domain}/api/orderstatus/totaldelivered/`;
export const getTotalPendingOrderNumber_url = `${domain}/api/orderstatus/totalpending/`;
export const getUserAllAddress_url = `${domain}/api/user/address/`;
export const getOrdersForDashboardCard_url = `${domain}/api/orders/dashboardcard/orders/`
export const getOrderForEditOrder_url = `${domain}/api/orders/orderforedit/`;
export const getStaticDeliveryInstructionsInfo_url = `${domain}/api/deliveryInstructions/`;
export const getCustomiseOrderDetail_url = `${domain}/api/orders/orderforcustomise/`;
export const updateAdminOrder_url = `${domain}/api/admin/editorder/`;
export const getUserBalanceFromWallet_url = `${domain}/api/wallet/balance/`;
export const updateUserBalanceForWallet_url = `${domain}/api/wallet/add/`;
export const getProductDropdownForSearch_url = `${domain}/api/products/dropdown/forsearch/`;
export const getDeliveryInstructions_url = `${domain}/api/deliveryInstructions/`;
export const updateDeliveryInstruction_url = `${domain}/api/deliveryInstructions/updated/`;
export const bulkUploadProduct_url = `${domain}/api/demo/`;
export const zipAssetUpload_url = `${domain}/api/asset/`;
export const getWalletLogs_url = `${domain}/api/wallet/balance/logs/`;
export const getWalletBalance_url = `${domain}/api/wallet/balance/`;
export const addAmountToWallet_url = `${domain}/api/wallet/addamountadmin/`;
export const imageAssetUpload_url = `${domain}/api/asset/image/`;
export const getAllUserFcmToken_url = `${domain}/api/notification/user/fcmtoken/`;
export const getSelectedUserFcmToken_url = `${domain}/api/notification/fcmtokens/`;
export const getFilteredUserNameForNotification_url = `${domain}/api/notification/user/name/`;
export const deleteAsset_url = `${domain}/api/asset/`;
export const getNotificationById_url = `${domain}/api/notification/`;
export const updateNotficationById_url = `${domain}/api/notification/`;
export const deleteNotificationById_url = `${domain}/api/notification/`;
export const getDealOfDayByDropdown_url = `${domain}/api/dealoftheday/featuredProduct/`;
export const getDealOfTheDayByProductId_url = `${domain}/api/dealoftheday/singlefeaturedProduct/`;
export const udpateDealOftheDayProduct_url = `${domain}/api/dealoftheday/body/featuredProduct/`;
export const udpateBlukDealOfTheDay_url = `${domain}/api/dealoftheday/nownow/`;
export const getOrderIdByCustomOrderId_url = `${domain}/api/orders/getOrderIdByCustomOrderId/`;
export const getOrderDateByOrderId_url = `${domain}/api/orders/readeabledate/`;
export const getLastTenOrder_url = `${domain}/api/orders/lasttenorder/orderforsearch/`;