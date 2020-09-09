let initialState = {};

type initialStateType = typeof initialState;

type sideBarReducerActipnType = {
    state: any,
    action: any
}

const sideBarReducer = (state = initialState, action: sideBarReducerActipnType): initialStateType => {
    return state;
};

export default sideBarReducer;