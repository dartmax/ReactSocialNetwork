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
};

const dialogsReducer = (state = initialState, action) => {
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

export let sendMessageCreator = (newMessageBody) => ({
    type: SEND_MESSAGE, newMessageBody
});

export default dialogsReducer;