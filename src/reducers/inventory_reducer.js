import {
    GET_INVENTORY_BEGIN,
    GET_INVENTORY_SUCCESS,
    GET_INVENTORY_ERROR,
    GET_PRODUCTBYNAMEFORINVENTORY_BEGIN,
    GET_PRODUCTBYNAMEFORINVENTORY_ERROR,
    GET_PRODUCTBYNAMEFORINVENTORY_SUCCESS
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

    if(action.type === GET_PRODUCTBYNAMEFORINVENTORY_BEGIN) {
        return {...state, inventoryProductName_loading: true, inventoryProductName_error: false}
    }

    if(action.type === GET_PRODUCTBYNAMEFORINVENTORY_ERROR) {
        return {...state, inventoryProductName_loading: false, inventoryProductName_error: true}
    }

    if(action.type === GET_PRODUCTBYNAMEFORINVENTORY_SUCCESS) {
        return {...state, inventoryProductName_loading: false, inventoryProductName: action.payload}
    }
    throw new Error(`No Matching "${action.type}" - action.type`);
}

export default inventory_reducer;