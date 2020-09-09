import React, {FC} from "react";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogsItem";
import AddMessageForm from "./AddMessageForm/AddMessageForm"
import {initialStateType} from "../../redux/dialogs-reducer";

type OwnPropsType = {
    dialogsPage: initialStateType
    sendMessage:(messageText: string) => void
}

export type NewMessageFormValuesType ={
    newMessageBody: string
}

const Dialogs: FC<OwnPropsType> = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map((d: { name: any; id: any; }) => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = state.messages.map((m: { message: any; id: any; }) => <Message message={m.message} key={m.id}/>);

    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody);
    };

    return (
        <div>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    <div>{messagesElements}</div>
                </div>
            </div>
            <AddMessageForm onSubmit={addNewMessage}/>
        </div>
    )
};


export default Dialogs;
