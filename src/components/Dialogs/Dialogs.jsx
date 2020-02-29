import React from "react";
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogsItem";

const Dialogs = (props) => {

    let dialogsElements = props.dialogs.map (d => <DialogItem name={d.name} id={d.id} />);
    let messegesElements = props.messeges.map (m =>  <Message message={m.message}/>);

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
