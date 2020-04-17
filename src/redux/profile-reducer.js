import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
        posts :[
            {id: 1, message: "Hi, how are you?", like: 20},
            {id: 2, message: "It's my first post", like: 30},
            {id: 3, message: "It's post", like: 0},
            {id: 4, message: "It's my 4th post!!!", like: 5}
        ],
        profile: null,
        status: " ",

};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                like: 0
            };
            return {
                ...state,
                post: [...state.posts, newPost],
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
        default:
            return state;
        }
};

export let addPostActionCreator = (newPostText) => ({
    type: ADD_POST, newPostText
});

export let setUserProfile = (profile) => ({
    type: SET_USER_PROFILE, profile
});

export let setStatus = (status) => ({
    type: SET_STATUS, status
});

export let deletePost = (postId) => ({
    type: DELETE_POST, postId
});

export let getUserProfile = (userId) => async (dispatch) => {
    const response = await usersAPI.getProfile(userId);
        dispatch(setUserProfile(response.data));
};

export let getStatus = (userId) => async(dispatch) => {
    const response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
};

export let updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0){
        dispatch(setStatus(status));
        }
};

export  default profileReducer;