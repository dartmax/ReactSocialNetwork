import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let posts =[
    {id: 1, message: 'Hi, how are you?', like: 20},
    {id: 2, message: "It's my first post", like: 30},
    {id: 3, message: "It's post", like: 0},
    {id: 4, message: "It's my 4th post!!!", like: 5}
];

let dialogs = [{id: 1, name: "Max"},
    {id: 2, name: "Jack"},
    {id: 3, name: "Olya"},
    {id: 4, name: "Angrew"},
    {id: 5, name: "Sasha"},
    {id: 6, name: "Kolya"},

];
let messeges = [{id: 1, message: "Hi, guys. What happen with coronavirus"},
    {id: 2, message: "How are your job, after coronavirus. You are alive?"},
    {id: 3, message: "bye! bye! see you later! Olya"},
    {id: 4, message: "bye! bye! see you later! Angrew"},
    {id: 5, message: "bye! bye! see you later! Sasha"},
    {id: 6, message: "bye! bye! see you later! Kolya"},
];

ReactDOM.render(<App posts={posts} dialogs={dialogs} messeges={messeges}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
