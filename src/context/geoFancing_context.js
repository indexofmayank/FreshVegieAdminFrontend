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
    UPDATE_EXISTING_GEOFANCING
} from '../actions';

const initailState = {
    geoFancing_loading: false,
    geoFancing_error: false,
    geoFancings: [],
    new_geoFancing: {
        name: '',
        image: '',
        status: '',
        circleInfo: '',
    },
    single_geoFancing_loading: false,
    single_geoFancing_error: false,
    single_geoFancing: {},
};

const GeoFancingContext = React.createContext();
export const GeoFancingProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initailState);

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

    const createNewGeoFancing = async (geoFancing) => {
        try {
            const response = await axios.post(geoFancing_url, geoFancing);
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    };

    const updateNewGeoFancingDetails = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        dispatch({type: UPDATE_EXISTING_GEOFANCING, payload: {name, value}});
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
                updateNewGeoFancingDetails
                
            }}
        >
            {children}
        </GeoFancingContext.Provider>
    )
};

export const useGeoFancingContext = () => {
    return useContext(GeoFancingContext);
};