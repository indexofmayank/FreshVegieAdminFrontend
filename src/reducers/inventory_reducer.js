import {
    GET_INVENTORY_BEGIN,
    GET_INVENTORY_SUCCESS,
    GET_INVENTORY_ERROR
} from '../actions';

const inventory_reducer = (state, action) => {
    if(action.type === GET_INVENTORY_BEGIN) {
        return {...state, inventory_error: false, inventory_loading: true};
    }

    if(action.type === GET_INVENTORY_ERROR) {
        return {...state, inventory_error: true, inventory_loading: false};
    }

    if(action.type === GET_INVENTORY_SUCCESS) {
        return {...state, inventory_loading: false, inventory: action.payload};
    }
    throw new Error(`No Matching "${action.type}" - action.type`);
}

export default inventory_reducer;