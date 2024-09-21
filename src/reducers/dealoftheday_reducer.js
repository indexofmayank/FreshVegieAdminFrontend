import {
    GET_ALLDEALOFTHEDAY_BEGIN,
    GET_ALLDEALOFTHEDAY_ERROR,
    GET_ALLDEALOFTHEDAY_SUCCESS,
    CREATE_NEW_DEALOFTHEDAY,
    UPDATE_PRODUCTFORDEALOFdTHEDAY,
    GET_PRODUCTFORDEALOFTHEDAY_BEGIN,
    GET_PRODUCTFORDEALOFTHEDAY_ERROR,
    GET_PRODUCTFORDEALOFTHEDAY_SUCCESS,

} from '../actions';

const dealoftheday_reducer = (state, action) => {

    if(action.type === GET_ALLDEALOFTHEDAY_BEGIN) {
        return {...state, dealOfTheDay_loading: true, dealOfTheDay_error: false}
    }

    if(action.type === GET_ALLDEALOFTHEDAY_ERROR){
        return {...state, dealOfTheDay_loading: false, dealOfTheDay_error: true}
    }

    if(action.type === GET_ALLDEALOFTHEDAY_SUCCESS) {
        return {...state, dealOfTheDay_loading: false, dealOfTheDay: action.payload }
    }

}

export default dealoftheday_reducer;