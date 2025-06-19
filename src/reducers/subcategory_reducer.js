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

const subcategory_reducer = (state, action) => {
    if(action.type === GET_SUBCATEGORY_BEGIN) {
        return {...state, subcategory_error: false, subcategory_loading: true};
    }

    if(action.type === GET_SUBCATEGORY_ERROR) {
        return {...state, subcategory_error: true, subcategory_loading: false};
    }

    if(action.type === GET_SUBCATEGORY_SUCCESS) {
        return {...state, subcategory_loading: false, categories: action.payload};
    }

    if(action.type === CREATE_NEW_SUBCATEGORY) {
        const {name, value} = action.payload;
        
        return {...state, new_subcategory: {...state.new_subcategory, [name]: value}};
    }

    if(action.type === UPDATE_EXISTING_SUBCATEGORY){
        const {name, value} = action.payload;
        return {
            ...state,
            single_subcategory: {...state.single_subcategory, [name]: value},
        };
    }

    if(action.type === GET_SINGLE_SUBCATEGORY_BEGIN) {
        return {
            ...state,
            single_subcategory_error: false,
            single_subcategory_loading: true
        }
    }

    if(action.type === GET_SINGLE_SUBCATEGORY_ERROR) {
        return {
            ...state,
            single_subcategory_error: true,
            single_subcategory_loading: false,
        }
    }

    if(action.type === GET_SINGLE_SUBCATEGORY_SUCCESS) {
        return {
            ...state,
            single_subcategory_loading: false,
            single_subcategory: action.payload,
        }
    }

    if(action.type === GET_ALLSUBCATEGORY_BEGIN) {
        return {
            ...state,
            subcategoriesByName_loading: true,
            subcategoriesByName_error: false
        }
    }

    if(action.type === GET_ALLSUBCATEGORY_ERROR) {
        return {
            ...state,
            subcategoriesByName_loading: false,
            subcategoriesByName_error: true
        }
    }

    if(action.type ===GET_ALLSUBCATEGORY_SUCCESS) {
        return {
            ...state,
            subcategoriesByName_loading: false,
            subcategoriesByName: action.payload
        }
    }
    

    throw new Error(`No matching ${action.type} - action type`);
};

export default subcategory_reducer;