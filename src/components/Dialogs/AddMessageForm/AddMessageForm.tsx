import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../../../Common/FormsControls/FormsControls";
import {Button} from '@material-ui/core';
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {NewMessageFormValuesType} from "../Dialogs";

const maxLength50 = maxLengthCreator(50);


type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}
const AddMessageForm: FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
              {createField<NewMessageFormValuesKeysType>("Add your message", "newMessageBody", [required, maxLength50], Textarea)}
            </div>
            <div>
                <Button variant="outlined">Send</Button>
            </div>
        </form>
    )
}

export default reduxForm<NewMessageFormValuesType>({form: "dialog-add-message-form"})(AddMessageForm);