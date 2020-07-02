import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from '../types/types'

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
        newPostText: "",
};

export type InitialState = typeof initialState;

export const profileReducer = (state = initialState, action: any): InitialStateType => {
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
                newPostText: '',
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

type addPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export let addPostActionCreator = (newPostText: string): addPostActionCreatorActionType => ({
    type: ADD_POST, newPostText
});

type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export let setUserProfile = (profile: ProfileType): setUserProfileActionType => ({
    type: SET_USER_PROFILE, profile
});

type setStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export let setStatus = (status: string): setStatusActionType => ({
    type: SET_STATUS, status
});

type deletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export let deletePost = (postId: number): deletePostActionType => ({
    type: DELETE_POST, postId
});

type savePhotoSuccessActionType = {
    type: typeof SAVE_PHOTOS_SUCCESS
    photos: PhotosType
}
export let savePhotoSuccess = (photos: PhotosType): savePhotoSuccessActionType => ({
    type: SAVE_PHOTOS_SUCCESS, photos
});


export let getUserProfile = (userId: number) => async (dispatch: any) => {
    const response = await usersAPI.getProfile(userId);
        dispatch(setUserProfile(response.data));
};

export let getStatus = (userId: number) => async(dispatch: any) => {
    const response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
};

export let updateStatus = (status: string) => async (dispatch: any) => {
   try {
       const response = await profileAPI.updateStatus(status);
       if (response.data.resultCode === 0) {
           dispatch(setStatus(status));
       }
   }catch (e) {
       
   }
};

export let savePhoto = (file: any) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0){
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};

export let saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0){
        dispatch(getUserProfile(userId));
    }else{
        dispatch(stopSubmit("edit-profile", {_error: response.data.message[0]}));
        return Promise.reject(response.data.message[0]);
    }
};


export  default profileReducer;