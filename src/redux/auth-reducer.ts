import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GEY_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GEY_CAPTCHA_URL_SUCCESS';


let initialState = {
    usersId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null, // if null. then captcha is not required
};

export type initialStateType = typeof initialState;


const authReducer = (state = initialState, action: any): initialStateType => {
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

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
    type: SET_USER_DATA, payload: {userId, email, login, isAuth} });

type getCaptchaUrlSuccessActionType = {
    type: typeof GEY_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({
    type: GEY_CAPTCHA_URL_SUCCESS, payload: {captchaUrl} });

export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
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

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logouts();
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
}

export default authReducer;