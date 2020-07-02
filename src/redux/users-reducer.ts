import {usersAPI} from "../api/api";
import {updateObjectArray} from "../utils/objectHelpers";
import {UserType} from "../types/types";

const FOLLOW = 'FOLLOW';
const UN_FOLLOW = 'UN_FOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users ids
};

type initialStateType = typeof initialState

export const usersReducer = (state = initialState, action: any): initialStateType => {
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
type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export let followSuccess = (userId: number): FollowSuccessActionType => ({
    type: FOLLOW, userId
});

type unFollowSuccessActionType = {
    type: typeof UN_FOLLOW
    userId: number
}
export let unFollowSuccess = (userId: number): unFollowSuccessActionType => ({
    type: UN_FOLLOW, userId
});

type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export let setUsers = (users: Array<UserType>): setUsersActionType => ({
    type: SET_USERS, users
});

type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export let setCurrentPage = (currentPage: number): setCurrentPageActionType => ({
    type: SET_CURRENT_PAGE, currentPage
});

type SetTotalUsersCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT
    count: number
}
export let setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
    type: SET_USERS_TOTAL_COUNT, count: totalUsersCount
});

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export let toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING, isFetching
});

type toggleIsFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export let toggleIsFollowingProgress = (isFetching: boolean, userId: number): toggleIsFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId
});

export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
};

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId));
}


export const follow = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFollowingProgress(true, userId));
        followUnfollowFlow(dispatch, userId, usersAPI.follow(userId), followSuccess);

    }
};
export const unFollow = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFollowingProgress(true, userId));
        followUnfollowFlow(dispatch, userId, usersAPI.unFollow(userId), unFollowSuccess);
    }
};
export default usersReducer;