import React from "react";
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogsItem";

const Dialogs = (props) => {

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


    let dialogsElements = dialogs.map (d => <DialogItem name={d.name} id={d.id} />);


    let messegesElements = messeges.map (m =>  <Message message={m.message}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                { messegesElements }
            </div>
        </div>
    )
}


export default Dialogs;
