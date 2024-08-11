import React, {useContext, useEffect, useReducer} from "react";
import axios from "axios";
import reducer from '../reducers/geoFancing_reducer';
import {
    geoFancing_url,
} from '../utils/constants';

import {
    GET_GEOFANCING_ERROR,
    GET_GEOFANCING_BEGIN,
    GET_GEOFANCING_SUCCESS,
    CREATE_NEW_GEOFANCING,
    GET_SINGLE_GEOFANCING_BEGIN,
    GET_SINGLE_GEOFANCING_SUCCESS,
    GET_SINGLE_GEOFANCING_ERROR,
    UPDATE_EXISTING_GEOFANCING
} from '../actions';

const initialState = {
    geoFancing_loading: false,
    geoFancing_error: false,
    geoFancings: [],
    new_geoFancing: {
        name: '',
        image: '',
        status: '',
        polygon: '',
    },
    single_geoFancing_loading: false,
    single_geoFancing_error: false,
    single_geoFancing: {},
};

const GeoFancingContext = React.createContext();
export const GeoFancingProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchGeoFancing = async () => {
        dispatch({type: GET_GEOFANCING_BEGIN});
        try {
            const response = await axios.get(geoFancing_url);
            const {data} = response.data;
            dispatch({type: GET_GEOFANCING_SUCCESS, payload: data});;
        } catch (error) {
            dispatch({type: GET_GEOFANCING_ERROR});
        }
    };

    const fetchSingleGeoFancing = async (id) => {
        dispatch({type: GET_SINGLE_GEOFANCING_BEGIN});
        try {
            const response = await axios.get(`${geoFancing_url}${id}`);
            const {data} = response.data;
            dispatch({type: GET_SINGLE_GEOFANCING_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_SINGLE_GEOFANCING_ERROR});
        }
    };

    const createNewGeoFancing = async ({name, status, polygon, image}) => {
        try {
            const response = await axios.post(geoFancing_url, {name, status, polygon, image});
            const {success, data} = response.data;
            fetchGeoFancing();
            return {success, data};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    };

    const updateNewGeoFancingDetails = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        dispatch({type: CREATE_NEW_GEOFANCING, payload: {name, value}});
    };

    const updateExistingGeoFancingDetails = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        dispatch({type: UPDATE_EXISTING_GEOFANCING, payload: {name, value}});
    };

    const updateGeoFancing = async (id, geoFancing) => {
        try {
            const response = await axios.put(`${geoFancing_url}${id}`, geoFancing);
            const {success, message} = response.data;
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    }

    const deleteGeoFancing = async (id, geoFancing) => {
        try {
            const respone = await axios.delete(`${geoFancing_url}${id}`);
            const {success, message} = respone.data;
            return {success, message};
        } catch (error) {
            const {success, message} = error.respone.data;
            return {success, message};
        }
    };

    useEffect(() => {
        fetchGeoFancing();
    }, []);
    
    return (
        <GeoFancingContext.Provider 
            value={{
                ...state,
                createNewGeoFancing,
                fetchGeoFancing,
                updateNewGeoFancingDetails,
                fetchSingleGeoFancing,
                updateExistingGeoFancingDetails,
                updateGeoFancing
            }}
        >
            {children}
        </GeoFancingContext.Provider>
    )
};

export const useGeoFancingContext = () => {
    return useContext(GeoFancingContext);
};