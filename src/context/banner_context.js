import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/banner_reducer';
import { create_banner_url, get_banner_url, udpate_banner_url, get_banner_by_id_url, delete_banner_by_id_url } from '../utils/constants';


import {
    GET_BANNER_BEGIN,
    GET_BANNER_ERROR,
    GET_BANNER_SUCCESS,
    CREATE_NEW_BANNER,
    UPDATE_EXISTING_BANNER,
    GET_SINGLE_BANNER_BEGIN,
    GET_SINGLE_BANNER_ERROR,
    GET_SINGLE_BANNER_SUCCESS
} from '../actions';

const initailState = {
    banner_loading: false,
    banner_error: false,
    banners: [],
    new_banner: {
        name: '',
        image: '',
        status: '',
    },
    single_banner_loading: false,
    single_banner_error: false,
    single_banner: {},
};

const BannerContext = React.createContext();
export const BannerProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initailState);

    const fetchBanner = async () => {
        dispatch({type: GET_BANNER_BEGIN});
        try {
            const response = await axios.get(get_banner_url);
            const {data} = response.data;
            dispatch({type: GET_BANNER_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_BANNER_ERROR});
        }
    };

    const updateNewBannerDetails = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        dispatch({type: CREATE_NEW_BANNER, payload: {name, value}});
    };

    const updateExistingBannerDetails = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        dispatch({type: UPDATE_EXISTING_BANNER, payload: {name, value}});
    };

    const createNewBanner = async (banner) => {
        try {
            const response = await axios.post(create_banner_url, banner);
            const {success, data} = response.data;
            fetchBanner();
            return {success, data};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    };

    const fetchSingleBanner = async (id) => {
        dispatch({type: GET_SINGLE_BANNER_BEGIN});
        try {
            const response = await axios.get(`${get_banner_by_id_url}${id}`);
            const {data} = response.data;
            dispatch({type: GET_SINGLE_BANNER_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_SINGLE_BANNER_ERROR});
        }
    };

    const updateBanner = async (id, banner) => {
        try {
            const response = await axios.put(`${udpate_banner_url}${id}`, banner);
            const {success, message} = response.data;
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    };

    const deleteBanner = async (id) => {
        try {
            const response = await axios.delete(`${delete_banner_by_id_url}${id}`);
            const {success, message} = response.data;
            return {success, message};
        }  catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    };

    useEffect(() => {
        fetchBanner();
    }, []);

    return (
        <BannerContext.Provider
            value={{
                ...state,
                createNewBanner,
                fetchBanner,
                updateNewBannerDetails,
                updateBanner,
                fetchSingleBanner,
                updateExistingBannerDetails,
                deleteBanner
            }}
        >
            {children}
        </BannerContext.Provider>
    )


};

export const useBannerContext = () => {
    return useContext(BannerContext);
};
