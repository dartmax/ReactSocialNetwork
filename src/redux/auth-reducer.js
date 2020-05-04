import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GEY_CAPTCHA_URL_SUCCESS = 'auth/GEY_CAPTCHA_URL_SUCCESS';

let initialState = {
    usersId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null, // if null. then captcha is not required
};

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_USER_DATA:
        case GEY_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
            default:
            return state;
    }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: GEY_CAPTCHA_URL_SUCCESS, payload: {userId, email, login, isAuth} });

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: SET_USER_DATA, payload: {captchaUrl} });

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
            if (response.data.resultCode === 0) {
                //success, get auth data
                dispatch(getAuthUserData())
            } else {
            if (response.data.resultCode === 10){
                dispatch.getCaptchaUrl();
            }

        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error";
                dispatch(stopSubmit("login", {_error: message}));
            }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await authAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logouts();
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
}

export default authReducer;