import {
    GET_CATEGORY_BEGIN,
    GET_CATEGORY_ERROR,
    GET_CATEGORY_SUCCESS,
    CREATE_NEW_CATEGORY,
    GET_SINGLE_CATEGORY_BEGIN,
    GET_SINGLE_CATEGORY_ERROR,
    GET_SINGLE_CATEGORY_SUCCESS,
    UPDATE_EXISTING_CATEGORY,
    GET_ALLCATEGORYBYNAME_BEGIN,
    GET_ALLCATEGORYBYNAME_ERROR,
    GET_ALLCATEGORYBYNAME_SUCCESS
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

    if(action.type === UPDATE_EXISTING_CATEGORY){
        const {name, value} = action.payload;
        return {
            ...state,
            single_category: {...state.single_category, [name]: value},
        };
    }

    if(action.type === GET_SINGLE_CATEGORY_BEGIN) {
        return {
            ...state,
            single_category_error: false,
            single_category_loading: true
        }
    }

    if(action.type === GET_SINGLE_CATEGORY_ERROR) {
        return {
            ...state,
            single_category_error: true,
            single_category_loading: false,
        }
    }

    if(action.type === GET_SINGLE_CATEGORY_SUCCESS) {
        return {
            ...state,
            single_category_loading: false,
            single_category: action.payload,
        }
    }

    if(action.type === GET_ALLCATEGORYBYNAME_BEGIN) {
        return {
            ...state,
            categoriesByName_loading: true,
            categoriesByName_error: false
        }
    }

    if(action.type === GET_ALLCATEGORYBYNAME_ERROR) {
        return {
            ...state,
            categoriesByName_loading: false,
            categoriesByName_error: true
        }
    }

    if(action.type ===GET_ALLCATEGORYBYNAME_SUCCESS) {
        return {
            ...state,
            categoriesByName_loading: false,
            categoriesByName: action.payload
        }
    }
    

    throw new Error(`No matching ${action.type} - action type`);
};

export default category_reducer;