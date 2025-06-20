import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/subcategory_reducer';

import {
    subcategory_url,
    delete_subcategory_url,
    create_subcategory_url,
    getsubCategoryForTable_url,
    getAllSubCategoryByName_url,
    getAllCategoryByName_url
} from '../utils/constants';

import {
    GET_SUBCATEGORY_BEGIN,
    GET_SUBCATEGORY_ERROR,
    GET_SUBCATEGORY_SUCCESS,
    GET_SINGLE_SUBCATEGORY_BEGIN,
    GET_SINGLE_SUBCATEGORY_ERROR,
    GET_SINGLE_SUBCATEGORY_SUCCESS,
    CREATE_NEW_SUBCATEGORY,
    UPDATE_EXISTING_SUBCATEGORY,
    GET_ALLSUBCATEGORY_BEGIN,
    GET_ALLSUBCATEGORY_ERROR,
    GET_ALLSUBCATEGORY_SUCCESS
} from '../actions';

const initialState = {
    subcategory_loading: false,
    subcategory_error: false,
    categories: [],
    subcategoriesByName_loading: false,
    subcategoriesByName_error: false,
    subcategoriesByName: {},
    single_subcategory: {},
    new_subcategory: {
        name: '',
        category: '',
        image: '',
        status: '',
        order: ''
    },
    single_subcategory_loading: false,
    single_subcategory_error: false,    
};

const SubCategoryContext = React.createContext();
export const SubCategoryProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCategory = async (newPage, limit) => {
        dispatch({type: GET_SUBCATEGORY_BEGIN});
        try {
            const response = await axios.get(`${getsubCategoryForTable_url}?page=${newPage}&limit=${limit}`);
            const data = response.data;
            console.log(data);
            dispatch({type: GET_SUBCATEGORY_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_SUBCATEGORY_ERROR});
        }
    };

    const fetchallSubCategory = async () => {
        // console.log('we hit here');
        dispatch({type: GET_ALLSUBCATEGORY_BEGIN});
        try {
            const response = await axios.get(`${getAllSubCategoryByName_url}`);
            const data = response.data;
            // console.log(data);
            dispatch({type: GET_ALLSUBCATEGORY_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_ALLSUBCATEGORY_ERROR});
        }
    }

    const updateCategory = async (id, category) => {
        console.log(category);
        try {
            const response = await axios.put(`${subcategory_url}${id}`, category);
            const {success, message} = response.data;
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    };

    const fetchSingleCategory = async (id) => {
        dispatch({type: GET_SINGLE_SUBCATEGORY_BEGIN});
        try {
            const response = await axios.get(`${subcategory_url}${id}`);
            const {data} = response.data;
            dispatch({type: GET_SINGLE_SUBCATEGORY_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_SINGLE_SUBCATEGORY_ERROR});
        }
    };

    const updateExistingsubCategoryDetails = (e) => {
        const name = e.target.name
        let value = e.target.value;
        dispatch({type: UPDATE_EXISTING_SUBCATEGORY, payload: {name, value}});
    };

    const updateNewSubCategoryDetails = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        dispatch({type: CREATE_NEW_SUBCATEGORY, payload: {name, value}});
    };


    const createNewsubCategory = async (category) => {
        try {
            const response = await axios.post(create_subcategory_url, category);
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
            const response = await axios.delete(`${delete_subcategory_url}${id}`);
            const {success, message} = response.data;
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    }

    // useEffect(() => {
    //     fetchallCategory();
    // }, []);

    return (
        <SubCategoryContext.Provider
            value={{
                ...state,
                fetchCategory,
                fetchSingleCategory,
                deleteCategory,
                createNewsubCategory,
                updateNewSubCategoryDetails,
                updateExistingsubCategoryDetails,
                updateCategory,
                fetchallSubCategory
            }}
        >
            {children}
        </SubCategoryContext.Provider>
    )

};

export const useSubCategoryContext = () => {
    return useContext(SubCategoryContext);
};