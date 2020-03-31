import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sideBarReducer from "./sidebar-reducer";


let store = {
    _state : {
        profilePage: {
            posts :[
                {id: 1, message: 'Hi, how are you?', like: 20},
                {id: 2, message: "It's my first post", like: 30},
                {id: 3, message: "It's post", like: 0},
                {id: 4, message: "It's my 4th post!!!", like: 5}
            ],
            newPostText: 'Hi from React!'

        },
        dialogsPage: {
            messages: [{id: 1, message: "Hi, guys. What happen with coronavirus"},
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
            newMessageBody: ""
        },
        sidebar: {}
    },
    _callSubscriber(){
        console.log('State changed')
    },

    getState(){
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer; // наблюдатель // publisher-subscriber // addeventListner// onClick // onChange
    },

    dispatch(action){
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sideBarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    },
};

window.state = store;

export default store;

