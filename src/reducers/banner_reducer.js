import {
    GET_BANNER_ERROR,
    GET_BANNER_BEGIN,
    GET_BANNER_SUCCESS,
    CREATE_NEW_BANNER
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
};

export default banner_reducer;
