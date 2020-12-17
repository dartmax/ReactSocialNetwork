import {getAuthUserData} from './auth-reducer';
import {InferActionsTypes} from './redux-store';



let initialState = {
    initialized: false,
};
export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>


export const appReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type){
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
            };
            default:
            return state;
    }
};
debugger;

export const actions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const),
}


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() =>{
        dispatch(actions.initializedSuccess());
    })
}

export default appReducer;