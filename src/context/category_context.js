import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/category_reducer';

import {
    category_url
} from '../utils/constants';

import {
    GET_CATEGORY_BEGIN,
    GET_CATEGORY_ERROR,
    GET_CATEGORY_SUCCESS,
    GET_SINGLE_CATEGORY_BEGIN,
    GET_SINGLE_CATEGORY_ERROR,
    GET_SINGLE_CATEGORY_SUCCESS
} from '../actions';

const initialState = {
    category_loading: false,
    category_error: false,
    categories: [],
    single_category: {}
};

const CategoryContext = React.createContext();
export const CategoryProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCategory = async () => {
        dispatch({type: GET_CATEGORY_BEGIN});
        try {
            const response = await axios.get(category_url);
            const {data} = response.data;
            dispatch({type: GET_CATEGORY_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_CATEGORY_ERROR});
        }
    };

    const fetchSingleCategory = async (id) => {
        dispatch({type: GET_SINGLE_CATEGORY_BEGIN});
        try {
            const response = await axios.get(`${category_url}${id}`);
            const {data} = response.data;
            console.log(data);
            dispatch({type: GET_SINGLE_CATEGORY_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_SINGLE_CATEGORY_ERROR});
        }
    };

    // const updateExistingCategoryDetails = (e) => {
    //     const name = e.target.name
    // };

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <CategoryContext.Provider
            value={{
                ...state,
                fetchCategory,
                fetchSingleCategory
            }}
        >
            {children}
        </CategoryContext.Provider>
    )

};

export const useCategoryContext = () => {
    return useContext(CategoryContext);
};