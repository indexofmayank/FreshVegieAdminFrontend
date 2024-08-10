import {
    GET_GEOFANCING_BEGIN,
    GET_GEOFANCING_SUCCESS,
    GET_GEOFANCING_ERROR,
    CREATE_NEW_GEOFANCING
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
        return {...state, new_geoFancing: {...state.new_getFancing, [name]: value}};
    }

    throw new Error(`No matching "${action.type}" - action type `);
};

export default geoFancing_reducer;