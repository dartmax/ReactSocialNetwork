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
            messeges: [{id: 1, message: "Hi, guys. What happen with coronavirus"},
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

            ]
        },
        sidebar: {}
    },
    _callSubscriber(){
        console.log('State changed')
    },
    getState(){
        return this._state;
    },
    addPost(){
        let newPost = {
            id:5,
            message: this._state.profilePage.newPostText,
            like: 0
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber(this._state);
    },
    updateNewPostText(newText){
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },
    subscribe(observer) {
        this._callSubscriber = observer; // набоюдатель // publisher-subscriber // addeventListner// onClick // onChange
    },

};

export default store;
window.state = store;

