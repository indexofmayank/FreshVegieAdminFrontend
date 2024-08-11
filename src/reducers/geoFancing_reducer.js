import {
    GET_GEOFANCING_BEGIN,
    GET_GEOFANCING_SUCCESS,
    GET_GEOFANCING_ERROR,
    CREATE_NEW_GEOFANCING,
    UPDATE_EXISTING_GEOFANCING,
    GET_SINGLE_GEOFANCING_BEGIN,
    GET_SINGLE_GEOFANCING_ERROR
} from '../actions';

const geoFancing_reducer = (state, action) => {

    if(action.type === GET_GEOFANCING_BEGIN){
        return {...state, geoFancing_error: false, geoFancing_loading: true};
    }

    if(action.type === GET_GEOFANCING_ERROR){
        return {...state, geoFancing_error: true, geoFancing_loading: false};
    }

    if(action.type === GET_GEOFANCING_SUCCESS) {
        return {...state, geoFancing_loading: false, geoFancings: action.payload};
    }

    if(action.type === CREATE_NEW_GEOFANCING) {
        const {name, value} = action.payload;
        return {...state, new_geoFancing: {...state.new_geoFancing, [name]: value}};
    }

    if(action.type === UPDATE_EXISTING_GEOFANCING) {
        const {name, value} = action.payload;
        return {...state.single_geoFancing, [name]: value}
    };

    if(action.type === GET_SINGLE_GEOFANCING_BEGIN) {
        return {
            ...state,
            single_geoFancing_loading: true,
            single_geoFancing_error: false
        }
    }

    if(action.type === GET_SINGLE_GEOFANCING_ERROR) {
        return {
            ...state,
            single_geoFancing_loading: false,
            single_geoFancing_error: true
        }
    }

    throw new Error(`No matching "${action.type}" - action type `);
};

export default geoFancing_reducer;