import {InferActionsTypes} from "./redux-store";

const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}
let initialState = {
    messages: [{id: 1, message: "Hi, guys. What happen when start coronavirus"},
        {id: 2, message: "How are your job, after coronavirus. You are alive?"},
        {id: 3, message: "bye! bye! see you later! Olya"},
        {id: 4, message: "bye! bye! see you later! Angrew"},
        {id: 5, message: "bye! bye! see you later! Sasha"},
        {id: 6, message: "bye! bye! see you later! Kolya"},
    ] as Array<MessageType>,
    dialogs: [{id: 1, name: "Max"},
        {id: 2, name: "Jack"},
        {id: 3, name: "Olya"},
        {id: 4, name: "Angrew"},
        {id: 5, name: "Sasha"},
        {id: 6, name: "Kolya"},

    ] as Array<DialogType>,
}

const dialogsReducer = (state = initialState, action: ActionsType): initialStateType  => {
    switch(action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}],
            };
        default:
            return state;
    }
};

export const actions = {
    sendMessage: (newMessageBody: string) => ({
        type: SEND_MESSAGE, newMessageBody
    } as const)
}

export default dialogsReducer;

export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>