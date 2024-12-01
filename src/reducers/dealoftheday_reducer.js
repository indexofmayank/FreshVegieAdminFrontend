import {
    GET_ALLDEALOFTHEDAY_BEGIN,
    GET_ALLDEALOFTHEDAY_ERROR,
    GET_ALLDEALOFTHEDAY_SUCCESS,
    GET_SINGLE_DEALOFTHEDAYBYID_BEGIN,
    GET_SINGLE_DEALOFTHEDAYBYID_SUCCESS,
    GET_SINGLE_DEALOFTHEDAYBYID_ERROR
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

    if(action.type === GET_SINGLE_DEALOFTHEDAYBYID_BEGIN) {
        return {...state, single_dealOfTheDay_loading: true, single_dealOfTheDay_error: false}
    }

    if(action.type === GET_SINGLE_DEALOFTHEDAYBYID_ERROR) {
        return {...state, single_dealOfTheDay_loading: false, single_dealOfTheDay_error: true}
    }

    if(action.type === GET_SINGLE_DEALOFTHEDAYBYID_SUCCESS) {
        return {...state, single_dealOfTheDay_loading: false,  single_dealOfTheDay: action.payload}
    }

}

export default dealoftheday_reducer;