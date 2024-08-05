import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/category_reducer';

import {
    category_url,
    delete_category_url,
    create_category_url
} from '../utils/constants';

import {
    GET_CATEGORY_BEGIN,
    GET_CATEGORY_ERROR,
    GET_CATEGORY_SUCCESS,
    GET_SINGLE_CATEGORY_BEGIN,
    GET_SINGLE_CATEGORY_ERROR,
    GET_SINGLE_CATEGORY_SUCCESS,
    CREATE_NEW_CATEGORY
} from '../actions';

const initialState = {
    category_loading: false,
    category_error: false,
    categories: [],
    single_category: {},
    new_category: {
        name: '',
        image: '',
    },
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
    const updateNewCategoryDetails = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        dispatch({type: CREATE_NEW_CATEGORY, payload: {name, value}});
    };


    const createNewCategory = async (category) => {
        try {
            console.log(category);
            const response = await axios.post(create_category_url, category);
            const {success, data} = response.data;
            fetchCategory();
            return {success, data};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    }

    const deleteCategory = async (id) => {
        try {
            const response = await axios.delete(`${delete_category_url}${id}`);
            const {success, message} = response.data;
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    }

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <CategoryContext.Provider
            value={{
                ...state,
                fetchCategory,
                fetchSingleCategory,
                deleteCategory,
                createNewCategory,
                updateNewCategoryDetails
            }}
        >
            {children}
        </CategoryContext.Provider>
    )

};

export const useCategoryContext = () => {
    return useContext(CategoryContext);
};