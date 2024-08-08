import { act } from 'react';
import {
    GET_BANNER_ERROR,
    GET_BANNER_BEGIN,
    GET_BANNER_SUCCESS,
    CREATE_NEW_BANNER,
    UPDATE_EXISTING_BANNER,
    GET_SINGLE_BANNER_BEGIN,
    GET_SINGLE_BANNER_ERROR,
    GET_SINGLE_BANNER_SUCCESS
} from '../actions';

const banner_reducer = (state, action) => {
    if(action.type === GET_BANNER_BEGIN) {
        return {...state, banner_error: false, banner_loading: true};
    }

    if(action.type === GET_BANNER_ERROR) {
        return {...state, banner_error: true, banner_loading: false};
    }

    if(action.type === GET_BANNER_SUCCESS) {
        return {...state, banner_loading: false, banners: action.payload};
    }

    if(action.type === CREATE_NEW_BANNER) {
        const {name, value} = action.payload;
        return {...state, new_banner: {...state.new_banner, [name]: value}};
    }

    if(action.type === UPDATE_EXISTING_BANNER) {
        const {name, value} = action.payload;
        return {
            ...state,
            single_banner: {...state.single_banner, [name]: value},
        };
    }

    if(action.type === GET_SINGLE_BANNER_BEGIN) {
        return {
            ...state,
            single_banner_error: false,
            single_banner_loading: true
        }
    }

    if(action.type === GET_SINGLE_BANNER_ERROR) {
        return {
            ...state,
            single_banner_loading: false,
            single_banner_error: true
        }
    }

    if(action.type === GET_SINGLE_BANNER_SUCCESS) {
        return {
            ...state,
            single_banner_loading: false,
            single_banner: action.payload,
        }
    }

    throw new Error(`No matching "${action.type}" - action type`);
};

export default banner_reducer;
