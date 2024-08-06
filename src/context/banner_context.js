import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/banner_reducer';

import {
    //will import banner api url
} from '../utils/constants';

import {
    GET_BANNER_BEGIN,
    GET_BANNER_ERROR,
    GET_BANNER_SUCCESS,
    CREATE_NEW_BANNER
} from '../actions';

const initailState = {
    banner_loading: false,
    banner_error: false,
    banners: [],
    single_banner: {},
    new_banner: {
        name: '',
        image: '',
        status: '',
    },
};

const BannerContext = React.createContext();
export const BannerProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initailState);
    //will do that letter;

};

export const useBannerContext = () => {
    return useContext(BannerContext);
};
