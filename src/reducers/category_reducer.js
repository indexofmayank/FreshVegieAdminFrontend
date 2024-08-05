import {
    GET_CATEGORY_BEGIN,
    GET_CATEGORY_ERROR,
    GET_CATEGORY_SUCCESS,
    CREATE_NEW_CATEGORY
} from '../actions';

const category_reducer = (state, action) => {
    if(action.type === GET_CATEGORY_BEGIN) {
        return {...state, category_error: false, category_loading: true};
    }

    if(action.type === GET_CATEGORY_ERROR) {
        return {...state, category_error: true, category_loading: false};
    }

    if(action.type === GET_CATEGORY_SUCCESS) {
        return {...state, category_loading: false, categories: action.payload};
    }

    if(action.type === CREATE_NEW_CATEGORY) {
        const {name, value} = action.payload;
        return {...state, new_category: {...state.new_category, [name]: value}};
    }


};

export default category_reducer;