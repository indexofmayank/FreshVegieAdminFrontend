import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from '../reducers/notification_reducer';
import {
    getAllNotification_url, getProductByNameForInventory, getAllProductName_url,
    getAllCategoryName_url, getAllUserName_url, getSingleNotification_url,
    getSelectedUserFcmToken_url, getFilteredUserNameForNotification_url,
    getNotificationById_url, updateNotficationById_url

} from '../utils/constants';
import {
    GET_NOTIFICATIONS_BEGIN,
    GET_NOTIFICATIONS_ERROR,
    GET_NOTIFICATIONS_SUCCESS,
    CREATE_NEW_NOTIFICATION,
    GET_PRODUCTBYNAMEFORNOTIFICATION_BEGIN,
    GET_PRODUCTBYNAMEFORNOTIFICATION_ERROR,
    GET_PRODUCTBYNAMEFORNOTIFICATION_SUCCESS,
    GET_CATEGORYBYNAMEFORNOTIFICATION_BEGIN,
    GET_CATEGORYBYNAMEFORNOTIFICATION_ERROR,
    GET_CATEGORYBYNAMEFORNOTIFICATION_SUCCESS,
    GET_USERNAMEFORNOTIFICATION_BEGIN,
    GET_USERNAMEFORNOTIFICATION_ERROR,
    GET_USERNAMEFORNOTIFICATION_SUCCESS,
    GET_SINGLENOTIFICATION_BEGIN,
    GET_SINGLENOTIFICATION_ERROR,
    GET_SINGLENOTIFICATION_SUCCESS,
    GET_NOTIFICATION_BEGIN,
    GET_NOTIFICATION_ERROR,
    GET_NOTIFICATION_SUCCESS,
    UPDATE_EXISTING_NOTIFICATION,


} from "../actions";

const initialState = {
    notificatin_loading: false,
    notification_error: false,
    notifications: {},
    new_notification: {
        name: '',
        heading: '',
        message: '',
        redirect_to: '',
        specific_product: '',
        category: '',
        link: '',
        audience: '',
        branch: '',
        customFilters: '',
        customers: '',
        status: '',
        image: '',
        lastLive: '',
    },
    notificationProductName_loading: false,
    notificationProductName_error: false,
    notificationProductName: [],
    categoryName_loading: false,
    categoryName_error: false,
    categories: [],
    userName_loading: false,
    userName_error: false,
    userName: [],
    single_notification_loading: false,
    single_notification_error: false,
    single_notification: {},
    

};

const NotificationContext = React.createContext();
export const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchNotifications = async () => {
        try {
            dispatch({ type: GET_NOTIFICATIONS_BEGIN });
            const response = await axios.get(getAllNotification_url);
            const { data } = response.data;
            dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: GET_NOTIFICATIONS_ERROR });
        }
    }

    const fetchSingleNotification = async (id) => {
        dispatch({type: GET_SINGLENOTIFICATION_BEGIN});
        try {
            const response = await axios.get(`${getSingleNotification_url}${id}`);
            console.log(response);
            const {data} = response.data;
            dispatch({type: GET_SINGLENOTIFICATION_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_SINGLENOTIFICATION_ERROR});
        }
    }


    const fetchProductNameForNotification = async () => {
        try {
            dispatch({ type: GET_PRODUCTBYNAMEFORNOTIFICATION_BEGIN });
            const response = await axios.get(getProductByNameForInventory);
            const { data } = response.data;
            dispatch({ type: GET_PRODUCTBYNAMEFORNOTIFICATION_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: GET_PRODUCTBYNAMEFORNOTIFICATION_ERROR });
        }
    }


    const createNewNotification = async (notification) => {
        try {
            const response = await axios.post(getAllNotification_url, notification);
            const { success, data } = response.data;
            fetchNotifications();
            return { success, data };
        } catch (error) {
            const { success, message } = error.response.data;
            return { success, message };
        }
    }

    const udpateNewNotificationDetails = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        dispatch({ type: CREATE_NEW_NOTIFICATION, payload: { name, value } });
    };

    const updateExistingNotificationDetails = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch({type: UPDATE_EXISTING_NOTIFICATION, payload: {name, value}});
    }

    const fetchCategoryNameForNotification = async () => {
        dispatch({ type: GET_CATEGORYBYNAMEFORNOTIFICATION_BEGIN });
        try {
            const response = await axios.get(getAllCategoryName_url);
            const { data } = response.data;
            dispatch({ type: GET_CATEGORYBYNAMEFORNOTIFICATION_SUCCESS, payload: data });
        } catch (error) {
            console.error(error);
            dispatch({ type: GET_CATEGORYBYNAMEFORNOTIFICATION_ERROR });
        }
    }

    const updateNotification = async (id, notification) => {
        try {

            console.log('notification:', notification);
            console.log('id: ', id);
            const response = await axios.put(`${updateNotficationById_url}${id}`, notification);
            const {success, message} = response.data;
            return {success: true};

        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    }

    const fetchUserNameForNotification = async (filter='') => {
        dispatch({ type: GET_USERNAMEFORNOTIFICATION_BEGIN });
        try {
            const response = await axios.get(`${getFilteredUserNameForNotification_url}?filter=${filter}`);
            const { data } = response;
            dispatch({ type: GET_USERNAMEFORNOTIFICATION_SUCCESS, payload: data });
        } catch (error) {
            console.error(error);
            dispatch({ type: GET_USERNAMEFORNOTIFICATION_ERROR });
        }
    }

    const fetchUserFcmTokenByUserIds = async (requireIds) => {
        try {
            const response = await axios.post(getSelectedUserFcmToken_url, {
                requireIds
            });
            return response;
        } catch (error) {
            const {message} = error.message;
            return {success: true, message};
        }
    }


    return (
        <NotificationContext.Provider
            value={{
                ...state,
                fetchNotifications,
                udpateNewNotificationDetails,
                createNewNotification,
                fetchProductNameForNotification,
                fetchCategoryNameForNotification,
                fetchUserNameForNotification,
                fetchSingleNotification,
                fetchUserFcmTokenByUserIds,
                updateExistingNotificationDetails,
                updateNotification
            }}
        >
            {children}
        </NotificationContext.Provider>
    );

};

export const useNotificationContext = () => {
    return useContext(NotificationContext);
}