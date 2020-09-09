import {FormAction, stopSubmit} from 'redux-form';
import {PhotosType, PostType, ProfileType} from '../types/types'
import {profileAPI} from '../api/profile-api';
import {BaseThunkType, InferActionsTypes} from './redux-store';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTOS_SUCCESS = 'SAVE_PHOTOS_SUCCESS';


let initialState = {
        posts :[
            {id: 1, message: "Hi, how are you?", like: 20},
            {id: 2, message: "It's my first post", like: 30},
            {id: 3, message: "It's post", like: 0},
            {id: 4, message: "It's my 4th post!!!", like: 5}
        ] as Array<PostType>,
        profile: null as ProfileType | null,
        status: "",
};

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                like: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case SET_USER_PROFILE:{
                return {
                    ...state,
                    profile: action.profile
                };
            }
        case SET_STATUS:{
            return {
                ...state,
                status: action.status
            };
        }
        case DELETE_POST:{
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId),
            };
        }
        case SAVE_PHOTOS_SUCCESS:{
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType,
            };
        }
        default:
            return state;
        }
};
export const actions = {
    addPostActionCreator: (newPostText: string) => ({
        type: ADD_POST, newPostText
    } as const),

    setUserProfile: (profile: ProfileType) => ({
        type: SET_USER_PROFILE, profile
    } as const),

    setStatus: (status: string) => ({
        type: SET_STATUS, status
    } as const),

    deletePost: (postId: number) => ({
        type: DELETE_POST, postId
    } as const),

    savePhotoSuccess: (photos: PhotosType) => ({
        type: SAVE_PHOTOS_SUCCESS, photos
    } as const)
}

export let getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
        dispatch(actions.setUserProfile(data));
};

export let getStatus = (userId: number): ThunkType => async(dispatch) => {
    const data = await profileAPI.getStatus(userId);
        dispatch(actions.setStatus(data));
};

export let updateStatus = (status: string): ThunkType => async (dispatch) => {
   try {
       const data = await profileAPI.updateStatus(status);
       if (data.resultCode === 0) {
           dispatch(actions.setStatus(status));
       }
   } catch (error) {
       //
   }
};

export let savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0){
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
};

export let saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0){
        if (userId !== null) {
            await dispatch(getUserProfile(userId));
        } else {
            throw new Error("userId can't be null")
        }
    }else{
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}));
        return Promise.reject(data.messages[0]);
    }
};


export  default profileReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>