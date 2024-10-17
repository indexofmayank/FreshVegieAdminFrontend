import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import {getDeliveryInstructions_url, updateDeliveryInstruction_url} from '../utils/constants';
import {
    GET_DELIVERYINSTRUCTIONS_BEGIN,
    GET_DELIVERYINSTRUCTIONS_ERROR,
    GET_DELIVERYINSTRUCTIONS_SUCCESS,
    UPDATE_EXISTING_DELIVERYINSTRUCTION
} from '../actions';
import reducer from '../reducers/deliveryInstruction_reducer';

const DeliveryInstructionContext = React.createContext();

const initialState = {
    deliveryInstruction_loading: false,
    deliveryInstruction_error: false,
    deliveryInsturction: {}
}

export const DeliveryInstructionProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchDeliveryInstruction = async () => {
        dispatch({type: GET_DELIVERYINSTRUCTIONS_BEGIN});
        try {
            const response = await axios.get(getDeliveryInstructions_url);
            const {data} = response.data;
            console.log(data);
            dispatch({type: GET_DELIVERYINSTRUCTIONS_SUCCESS, payload: data});
        } catch (error) {
            const {message} = error;
            dispatch({type: GET_DELIVERYINSTRUCTIONS_ERROR});
            return {success: false, message};
        }
    }

    const updateExistingDeliveryInstruction = async (e) => {
        const name = e.target.name;
        let value = e.target.value;
        dispatch({type: UPDATE_EXISTING_DELIVERYINSTRUCTION, payload: {name, value}});
    }

    const updateDeliveryInstruction = async ( deliveryInstruction) => {
        try {
            const response = await axios.put(updateDeliveryInstruction_url, deliveryInstruction);
            const {success, message} = response.data;
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    }



    return (
        <DeliveryInstructionContext.Provider
            value={{
                ...state,
                fetchDeliveryInstruction,
                updateExistingDeliveryInstruction,
                updateDeliveryInstruction
            }}
        >
            {children}
        </DeliveryInstructionContext.Provider>
    )

}

export const useDeliveryInstructionContext = () => {
    return useContext(DeliveryInstructionContext);
}