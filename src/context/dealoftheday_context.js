import React, {Children, useContext, useEffect, useReducer} from "react";
import axios from 'axios';
import reducer from '../reducers/dealoftheday_reducer';
import {getDealOfTheDayForTable_url, getFeaturedProductForTable_url, getDealOfTheDay_url, getSingleDealOfTheDay_url, updateDealOfTheDay_url} from '../utils/constants';

import {
    GET_ALLDEALOFTHEDAY_BEGIN,
    GET_ALLDEALOFTHEDAY_ERROR,
    GET_ALLDEALOFTHEDAY_SUCCESS,
    CREATE_NEW_DEALOFTHEDAY,
    GET_PRODUCTFORDEALOFTHEDAY_BEGIN,
    GET_PRODUCTFORDEALOFTHEDAY_ERROR,
    GET_PRODUCTFORDEALOFTHEDAY_SUCCESS,
    UPDATE_PRODUCTFORDEALOFdTHEDAY
} from '../actions';

const initialState = {
    dealOfTheDay_loading: false,
    dealOfTheDay_error: false,
    dealOfTheDay: [],
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

    // useEffect(() => {
    //     fetchDealOfTheDayForTable();
    // }, []);

    return (
        <DealOfTheDayContext.Provider
            value={{
                ...state,
                fetchDealOfTheDayForTable,
                updateDealOfTheDay,
            }}
        >
            {children}
        </DealOfTheDayContext.Provider>
    )
}

export const useDealOfTheDayContext = () => {
    return useContext(DealOfTheDayContext)
}