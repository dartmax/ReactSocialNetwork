let initialState = {};

type initialStateType = typeof initialState;

type sideBarReducerActipnType = {
    state: any
    action: any
}

const sideBarReducer = (state = initialState, action: any): initialStateType => {
    return state;
};

export default sideBarReducer;