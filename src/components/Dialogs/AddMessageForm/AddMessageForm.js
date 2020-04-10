import React from "react";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../Common/FormsControls/FormsControls";
import {Button} from '@material-ui/core';
import {maxLengthCreator, required} from "../../../utils/validators/validators";

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} placeholder="Add your message" validate={[required, maxLength50]} name="newMessageBody" />
            </div>
            <div>
                <Button variant="outlined">Send</Button>
            </div>
        </form>
    )
}

export default reduxForm({form: "dialog-add-message-form"})(AddMessageForm);