import {usersAPI} from "../api/api";
import {updateObjectArray} from "../utils/objectHelpers";

const FOLLOW = 'FOLLOW';
const UN_FOLLOW = 'UN_FOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectArray(state.users, action.userId, "id",{followed: true})
            };
        case UN_FOLLOW:
            return {
                ...state,
                users: updateObjectArray(state.users, action.userId, "id",{followed: false})
            };
        case SET_USERS:
            return {
                ...state, users: action.users
            };
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            };
        case SET_USERS_TOTAL_COUNT:
            return {
                ...state, totalUsersCount: action.count
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
};

export let followSuccess = (userId) => ({
    type: FOLLOW, userId
});
export let unFollowSuccess = (userId) => ({
    type: UN_FOLLOW, userId
});
export let setUsers = (users) => ({
    type: SET_USERS, users
});
export let setCurrentPage = (currentPages) => ({
    type: SET_CURRENT_PAGE, currentPages
});
export let setTotalUsersCount = (totalUsersCount) => ({
    type: SET_USERS_TOTAL_COUNT, count: totalUsersCount
});
export let toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING, isFetching
});
export let toggleIsFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId
});

export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
};

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId));
}


export const follow = (userId) => {
    return async (dispatch) => {
        dispatch(toggleIsFollowingProgress(true, userId));
        followUnfollowFlow(dispatch, userId, usersAPI.follow(userId), followSuccess);

    }
};
export const unFollow = (userId) => {
    return async (dispatch) => {
        dispatch(toggleIsFollowingProgress(true, userId));
        followUnfollowFlow(dispatch, userId, usersAPI.unFollow(userId), unFollowSuccess);
    }
};
export default usersReducer;