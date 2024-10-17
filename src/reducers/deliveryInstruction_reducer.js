import {
    GET_DELIVERYINSTRUCTIONS_BEGIN,
    GET_DELIVERYINSTRUCTIONS_ERROR,
    GET_DELIVERYINSTRUCTIONS_SUCCESS,
    UPDATE_EXISTING_DELIVERYINSTRUCTION
} from '../actions';

const deliveryInstruction = (state, action) => {
    if(action.type === GET_DELIVERYINSTRUCTIONS_BEGIN) {
        return {
            ...state,
            deliveryInstruction_loading: true,
            deliveryInstruction_error: false
        }
    }

    if(action.type === GET_DELIVERYINSTRUCTIONS_ERROR) {
        return {
            ...state,
            deliveryInstruction_loading: false,
            deliveryInstruction_error: true
         }
    }

    if(action.type === GET_DELIVERYINSTRUCTIONS_SUCCESS) {
        return {
            ...state,
            deliveryInstruction_loading: false,
            deliveryInsturction: action.payload
        }
    }

    if(action.type === UPDATE_EXISTING_DELIVERYINSTRUCTION) {
        const {name, value} = action.payload;
        return {
            ...state,
            deliveryInsturction: {...state.deliveryInsturction, [name]: value}, 
        }
    }
}

export default deliveryInstruction;