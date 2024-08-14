import React, {useEffect, useContext, useReducer, Children} from "react";
import axios from "axios";
import reducer from '../reducers/inventory_reducer';
import {
    GET_INVENTORY_BEGIN,
    GET_INVENTORY_SUCCESS,
    GET_INVENTORY_ERROR
} from '../actions';
import { inventory_url } from "../utils/constants";

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
            console.log(data);
            dispatch({type: GET_INVENTORY_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_INVENTORY_ERROR});
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
            }}
        >
            {children}
        </InventoryContext.Provider>
    )
};

export const useInventoryContext = () => {
    return useContext(InventoryContext);
}