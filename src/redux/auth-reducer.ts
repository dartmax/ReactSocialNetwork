import {FormAction, stopSubmit} from 'redux-form';

import {ResultCodeForCaptchaEnum, ResultCodesEnum} from '../api/api';
import {authAPI} from '../api/auth-api';
import {securityAPI} from '../api/security-api';
import {BaseThunkType, InferActionsTypes} from './redux-store';

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null, // if null. then captcha is not required
};



const authReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type){
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
            default:
            return state;
    }
};

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA, payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me();
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
            if (data.resultCode === ResultCodesEnum.Success) {
                //success, get auth data
                await dispatch(getAuthUserData())
            } else {
            if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired){
                await dispatch(getCaptchaUrl());
            }

        let message = data.messages.length > 0 ? data.messages[0] : "Some Error";
                dispatch(stopSubmit("login", {_error: message}));
    }
}

export const getCaptchaUrl = (): BaseThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
        const captchaUrl = data.url;
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch: any) => {
    let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            await dispatch(actions.setAuthUserData(null, null, null, false))
        }
}

export default authReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>