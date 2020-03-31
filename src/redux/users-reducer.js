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
    followingInProgress: false,
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type){
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        case UN_FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            };
        case SET_USERS:
            return { ...state, users: action.users
            };
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage
            };
        case SET_USERS_TOTAL_COUNT:
            return { ...state, totalUsersCount: action.count
            };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching
            };
            case TOGGLE_IS_FOLLOWING_PROGRESS:
            return { ...state, followingInProgress: action.isFetching
            };
            default:
            return state;
    }
};

export let follow = (userId) => ({
    type: FOLLOW, userId
});
export let unFollow = (userId) => ({
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
export let toggleIsFollowingProgress = (isFetching) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching
});

export  default usersReducer;