const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    messages: [{id: 1, message: "Hi, guys. What happen when start coronavirus"},
        {id: 2, message: "How are your job, after coronavirus. You are alive?"},
        {id: 3, message: "bye! bye! see you later! Olya"},
        {id: 4, message: "bye! bye! see you later! Angrew"},
        {id: 5, message: "bye! bye! see you later! Sasha"},
        {id: 6, message: "bye! bye! see you later! Kolya"},
    ],
    dialogs: [{id: 1, name: "Max"},
        {id: 2, name: "Jack"},
        {id: 3, name: "Olya"},
        {id: 4, name: "Angrew"},
        {id: 5, name: "Sasha"},
        {id: 6, name: "Kolya"},

    ],
    newMessageBody: "",
};

const dialogsReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            };
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 6, message: body}],
            };
        default:
            return state;
    }
};

export let sendMessageCreator = () => ({
    type: SEND_MESSAGE,
});

export let updateNewMessageBodyCreator = (text) => ({
    type: UPDATE_NEW_MESSAGE_BODY, body: text
});


export default dialogsReducer;