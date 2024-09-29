import React, {useEffect, useContext, useReducer, Children} from "react";
import axios from "axios";
import reducer from '../reducers/inventory_reducer';
import {
    GET_INVENTORY_BEGIN,
    GET_INVENTORY_SUCCESS,
    GET_INVENTORY_ERROR,
    UPDATE_INVENTORY,
    GET_PRODUCTBYNAMEFORINVENTORY_SUCCESS
} from '../actions';
import { inventory_url, update_product_url, getProductByNameForInventory } from "../utils/constants";

const initialState = {
    invetory_loading: false,
    inventory_error: false,
    inventoryProductName_loading: false,
    inventoryProductName_error: false,
    inventoryProductName: [],
    inventory: [],
}

const InventoryContext = React.createContext();

export const InventoryProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchInventory = async (page='', limit='', category='', product='') => {
        dispatch({type: GET_INVENTORY_BEGIN});
        try {
            const response = await axios.get(`${inventory_url}?page=${page}&limit=${limit}&category=${category}&product=${product}`);
            const {data} = response;
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


    const fetchProductByNameForInventory = async (name='', categoryId='') => {
        console.log(categoryId);
        try {
            const response = await axios.get(`${getProductByNameForInventory}?name=${name}`);
            const {data} = response.data;
            dispatch({type: GET_PRODUCTBYNAMEFORINVENTORY_SUCCESS, payload: data});
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    return (
        <InventoryContext.Provider
            value={{
                ...state,
                fetchInventory,
                updateInventory,
                fetchProductByNameForInventory
            }}
        >
            {children}
        </InventoryContext.Provider>
    )
};

export const useInventoryContext = () => {
    return useContext(InventoryContext);
}