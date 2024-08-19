import {
    GET_USERLOGS_BEGIN,
    GET_USERLOGS_ERROR,
    GET_USERLOGS_SUCCESS
} from '../actions';

const userDetail_reducer = (state, action) => {

    if(action.type === GET_USERLOGS_BEGIN) {
        return {...state, userDetail_loading: true, userDetail_error: false}
    }

    if(action.type === GET_USERLOGS_ERROR) {
        return {...state, userDetail_loading: false,  userDetail_error: true}
    }

    if(action.type ===GET_USERLOGS_SUCCESS ) {
        return {...state, userDetail_loading: false, userDetails: action.payload}
    }

    throw new Error(`No matching`);
};

export default userDetail_reducer;