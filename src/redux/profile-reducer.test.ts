import React from 'react';
import  profileReducer, {actions} from './profile-reducer';
import {ProfileType} from "../types/types";


let state = {
    posts: [
        {id: 1, message: "Hi, how are you?", like: 20},
        {id: 2, message: "It's my first post", like: 30},
        {id: 3, message: "It's post", like: 0},
        {id: 4, message: "It's my 4th post!!!", like: 5}
    ],
    profile: null as ProfileType | null,
    status: "",
};

it('length of post should be increment', () => {
    let action = actions.addPostActionCreator("Hi from Kiev capital");

    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(5);
});

it('message of new post should be correct', () => {
    let action = actions.addPostActionCreator("Hi from Kiev capital");

    let newState = profileReducer(state, action);
    expect(newState.posts[4].message).toBe("Hi from Kiev capital");
});


it('Length after deleting length should be increment', () => {
    let action = actions.deletePost(1);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
});

it('Length after deleting length should be decrement if if is incorrect', () => {
    let action = actions.deletePost(1000);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(4);
});
