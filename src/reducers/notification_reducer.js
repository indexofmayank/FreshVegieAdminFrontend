import {
    CREATE_NEW_NOTIFICATION,
    GET_NOTIFICATIONS_BEGIN,
    GET_NOTIFICATIONS_ERROR,
    GET_NOTIFICATIONS_SUCCESS,
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
    UPDATE_EXISTING_NOTIFICATION
} from '../actions';

const notification_reducer = (state, action) => {
    if(action.type === GET_NOTIFICATIONS_BEGIN) {
        return {...state, notification_error: false,  notificatin_loading: true}
    }
 
    if(action.type === GET_NOTIFICATIONS_ERROR) {
        return {...state, notificatin_loading: false, notification_error: true}
    }

    if(action.type === GET_NOTIFICATIONS_SUCCESS) {
        return {...state, notificatin_loading: false, notifications: action.payload}
    }

    if(action.type === CREATE_NEW_NOTIFICATION) {
        const {name, value} = action.payload;
        return {...state, new_notification: {...state.new_notification, [name]: value}};

    }

    if(action.type === GET_PRODUCTBYNAMEFORNOTIFICATION_BEGIN) {
        return {...state, notificationProductName_loading: true, notificationProductName_error: false}
    }

    if(action.type === GET_PRODUCTBYNAMEFORNOTIFICATION_ERROR) {
        return {...state, notificationProductName_loading: false, notificationProductName_error: true}
    }

    if(action.type === GET_PRODUCTBYNAMEFORNOTIFICATION_SUCCESS) {
        return {...state, notificationProductName_loading: false, notificationProductName: action.payload}
    }

    if(action.type === GET_CATEGORYBYNAMEFORNOTIFICATION_BEGIN) {
        return {...state, categoryName_loading: true, categoryName_error: false}
    }

    if(action.type === GET_CATEGORYBYNAMEFORNOTIFICATION_ERROR) {
        return {...state, categoryName_loading: false, categoryName_error: true}
    }

    if(action.type === GET_CATEGORYBYNAMEFORNOTIFICATION_SUCCESS) {
        return {...state, categoryName_loading: false, notificationcategorieName: action.payload}
    }

    if(action.type === GET_USERNAMEFORNOTIFICATION_BEGIN) {
        return {...state, userName_loading: true, userName_error: false}
    }

    if(action.type === GET_USERNAMEFORNOTIFICATION_SUCCESS) {
        return {...state, userName_loading: false, userName: action.payload}
    }

    if(action.type === GET_USERNAMEFORNOTIFICATION_ERROR) {
        return {...state, userName_loading: false,  userName_error: true}
    }

    if(action.type === GET_SINGLENOTIFICATION_BEGIN) { 
        return {...state, single_notification_loading: true, single_notification_error: false}
    }

    if(action.type === GET_SINGLENOTIFICATION_ERROR ) {
        return {...state, single_notification_loading: false, single_notification_error: true}
    }  

    if(action.type === GET_SINGLENOTIFICATION_SUCCESS) { 
        const singleNotification = Array.isArray(action.payload) ? action.payload[0]: action.payload;
        
        return {...state, single_notification_loading: false, single_notification: singleNotification }
    }

    if(action.type === UPDATE_EXISTING_NOTIFICATION) {
        const {name, value} = action.payload;
        return {
            ...state,
            single_notification: {...state.single_notification, [name]: value}
        }
    }

    throw new Error(`No matching "${action.type}" - action type`);
}

export default notification_reducer;