import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/category_reducer';

import {
    category_url,
    delete_category_url,
    create_category_url,
    getCategoryForTable_url,
    getAllCategoryByName_url
} from '../utils/constants';

import {
    GET_CATEGORY_BEGIN,
    GET_CATEGORY_ERROR,
    GET_CATEGORY_SUCCESS,
    GET_SINGLE_CATEGORY_BEGIN,
    GET_SINGLE_CATEGORY_ERROR,
    GET_SINGLE_CATEGORY_SUCCESS,
    CREATE_NEW_CATEGORY,
    UPDATE_EXISTING_CATEGORY,
    GET_ALLCATEGORYBYNAME_BEGIN,
    GET_ALLCATEGORYBYNAME_ERROR,
    GET_ALLCATEGORYBYNAME_SUCCESS
} from '../actions';

const initialState = {
    category_loading: false,
    category_error: false,
    categories: [],
    categoriesByName_loading: false,
    categoriesByName_error: false,
    categoriesByName: {},
    single_category: {},
    new_category: {
        name: '',
        image: '',
        status: ''
    },
    single_category_loading: false,
    single_category_error: false,
    single_category: {}    
};

const CategoryContext = React.createContext();
export const CategoryProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCategory = async (newPage, limit) => {
        dispatch({type: GET_CATEGORY_BEGIN});
        try {
            const response = await axios.get(`${getCategoryForTable_url}?page=${newPage}&limit=${limit}`);
            const data = response.data;
            dispatch({type: GET_CATEGORY_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_CATEGORY_ERROR});
        }
    };

    const fetchCategoryByName = async () => {
        console.log('we hit here');
        dispatch({type: GET_ALLCATEGORYBYNAME_BEGIN});
        try {
            const response = await axios.get(`${getAllCategoryByName_url}`);
            const data = response.data;
            dispatch({type: GET_ALLCATEGORYBYNAME_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_ALLCATEGORYBYNAME_ERROR});
        }
    }

    const updateCategory = async (id, category) => {
        try {
            const response = await axios.put(`${category_url}${id}`, category);
            const {success, message} = response.data;
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    };

    const fetchSingleCategory = async (id) => {
        dispatch({type: GET_SINGLE_CATEGORY_BEGIN});
        try {
            const response = await axios.get(`${category_url}${id}`);
            const {data} = response.data;
            dispatch({type: GET_SINGLE_CATEGORY_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_SINGLE_CATEGORY_ERROR});
        }
    };

    const updateExistingCategoryDetails = (e) => {
        const name = e.target.name
        let value = e.target.value;
        dispatch({type: UPDATE_EXISTING_CATEGORY, payload: {name, value}});
    };

    const updateNewCategoryDetails = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        dispatch({type: CREATE_NEW_CATEGORY, payload: {name, value}});
    };


    const createNewCategory = async (category) => {
        try {
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
                updateNewCategoryDetails,
                updateExistingCategoryDetails,
                updateCategory,
                fetchCategoryByName
            }}
        >
            {children}
        </CategoryContext.Provider>
    )

};

export const useCategoryContext = () => {
    return useContext(CategoryContext);
};