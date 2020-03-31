const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
        posts :[
            {id: 1, message: "Hi, how are you?", like: 20},
            {id: 2, message: "It's my first post", like: 30},
            {id: 3, message: "It's post", like: 0},
            {id: 4, message: "It's my 4th post!!!", like: 5}
        ],
        newPostText: 'Hi from React!',
    profile: null,

};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                like: 0
            };
            return {
                ...state,
                post: [...state.posts, newPost],
                newPostText: '',
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
                };
            }
        case SET_USER_PROFILE:{
                return {
                    ...state,
                    profile: action.profile
                };
            }
        default:
            return state;
        }
};

export let addPostActionCreator = () => ({
    type: ADD_POST,
});

export let updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT, newText: text
});

export let setUserProfile = (profile) => ({
    type: SET_USER_PROFILE, profile
});

export  default profileReducer;