import { checkResponse} from '../../helpers/session';
import  { httpGet } from '../../helpers/network';
import { defaultMErrorMsg } from '../../constants/Defaults';
import * as t from './actionType';

export const newRequest = () => ({
    type: t.NEWS_GET_REQUEST,
})

export const newSuccess = (data: any) => ({
    type: t.NEWS_GET_SUCCESS,
    payload: data,
})

export const newsFailure = (errorMsg: string =
    defaultMErrorMsg): any => ({
    type: t.NEWS_GET_FAILURE,
    payload: {
        errorMsg,
    },
    error: true,
})

export function getNews() {
    return (dispatch: any): any => {
        dispatch(newsRequest())
        return httpGet('news')
            .then(res => {
                if (checkResponse(res)){
                    dispatch(newSuccess(res.data))
                } else if {
                    dispatch(newsFailure(res.message))
                }
            })
            .catch(error => {
                dispatch(newsFailure())
            })
    }
}