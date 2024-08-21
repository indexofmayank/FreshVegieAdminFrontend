import React, {useEffect, useContext, useReducer, Children} from "react";
import axios from "axios";
import reducer from '../reducers/inventory_reducer';
import {
    GET_INVENTORY_BEGIN,
    GET_INVENTORY_SUCCESS,
    GET_INVENTORY_ERROR,
    UPDATE_INVENTORY
} from '../actions';
import { inventory_url, update_product_url } from "../utils/constants";

const initialState = {
    invetory_loading: false,
    inventory_error: false,
    inventory: [],
}

const InventoryContext = React.createContext();

export const InventoryProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchInventory = async () => {
        dispatch({type: GET_INVENTORY_BEGIN});
        try {
            const response = await axios.get(inventory_url);
            const {data} = response.data;
            dispatch({type: GET_INVENTORY_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_INVENTORY_ERROR});
        }
    };

    const updateInventory = async (updateProducts) => {
        try {
            const response = await axios.put(`${inventory_url}`, updateProducts);
            const {success, message} = response.data;
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    }

    useEffect(() => {
        fetchInventory();
    }, []);

    return (
        <InventoryContext.Provider
            value={{
                ...state,
                fetchInventory,
                updateInventory
            }}
        >
            {children}
        </InventoryContext.Provider>
    )
};

export const useInventoryContext = () => {
    return useContext(InventoryContext);
}