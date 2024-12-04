import React, {Children, useContext, useEffect, useReducer} from "react";
import axios from 'axios';
import reducer from '../reducers/dealoftheday_reducer';
import {
    getDealOfTheDayForTable_url, 
    getFeaturedProductForTable_url, 
    getDealOfTheDay_url, 
    getSingleDealOfTheDay_url, 
    updateDealOfTheDay_url,
    getDealOfDayByDropdown_url,
    getDealOfTheDayByProductId_url,
    udpateDealOftheDayProduct_url,
    udpateBlukDealOfTheDay_url
} from '../utils/constants';

import {
    GET_ALLDEALOFTHEDAY_BEGIN,
    GET_ALLDEALOFTHEDAY_ERROR,
    GET_ALLDEALOFTHEDAY_SUCCESS,
    GET_SINGLE_DEALOFTHEDAYBYID_BEGIN,
    GET_SINGLE_DEALOFTHEDAYBYID_SUCCESS,
    GET_SINGLE_DEALOFTHEDAYBYID_ERROR

} from '../actions';


const initialState = {
    dealOfTheDay_loading: false,
    dealOfTheDay_error: false,
    dealOfTheDay: [],
    single_dealOfTheDay_loading: false,
    single_dealOfTheDay_error: false,
    single_dealOfTheDay: {},
}

const DealOfTheDayContext = React.createContext();

export const DealOfTheDayProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchDealOfTheDayForTable = async () => {
        dispatch({type: GET_ALLDEALOFTHEDAY_BEGIN});
        try {
            const response = await axios.get(getFeaturedProductForTable_url);
            const {data} = response.data;
            dispatch({type: GET_ALLDEALOFTHEDAY_SUCCESS, payload: data });
        } catch (error) {
            dispatch({type: GET_ALLDEALOFTHEDAY_ERROR});
        }
    }

    const updateDealOfTheDay = async (id) => {
        try {
            const response = await axios.put(`${updateDealOfTheDay_url}${id}`);
            const {success, message} = response.data;
            fetchDealOfTheDayForTable();
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    }

    const getDealOfTheDayForDropdown = async (name='') => {
        try {
            const response = await axios.post(`${getDealOfDayByDropdown_url}`,
                {name: name}
            );
            const {data} = response.data;
            return {data};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    }

    const fetchDealOfTheDayById = async (id) => {
        dispatch({type: GET_SINGLE_DEALOFTHEDAYBYID_BEGIN});
        try {
            const response = await axios.get(`${getDealOfTheDayByProductId_url}${id}`);
            const {data} = response.data;
            dispatch({type: GET_SINGLE_DEALOFTHEDAYBYID_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_SINGLE_DEALOFTHEDAYBYID_ERROR});
        }
    }

    const updateSingleDealOfTheDay = async (id, updatedData) => {
        console.log(updatedData);
        try {
            const response = await axios.put(`${udpateDealOftheDayProduct_url}${id}`,
                {featured: true}
            );
            console.log(response);
            const {success, message} = response.data;
            return {success, message};
        } catch (error) {
            const {success, message} = error.response
        }
    }

    const blukUpdateDealOfTheDay = async (updatedData) => {
        try {
            console.log(updatedData);
            const response = await axios.put(`${udpateBlukDealOfTheDay_url}`,
                updatedData
            );
            console.log(response);
            const {success, message} = response;
            return {success, message};
        } catch (error) {
            console.log(error);
            const {success, message} = error.response;
            return {success, message};
        }
    }

    return (
        <DealOfTheDayContext.Provider
            value={{
                ...state,
                fetchDealOfTheDayForTable,
                updateDealOfTheDay,
                getDealOfTheDayForDropdown,
                fetchDealOfTheDayById,
                updateSingleDealOfTheDay,
                blukUpdateDealOfTheDay,
            }}
        >
            {children}
        </DealOfTheDayContext.Provider>
    )
}

export const useDealOfTheDayContext = () => {
    return useContext(DealOfTheDayContext)
}