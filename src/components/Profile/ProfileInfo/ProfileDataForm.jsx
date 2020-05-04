import React from "react";
import {Button} from "@material-ui/core";
import {createField, Input, Textarea} from "../../../Common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import Checkbox from "@material-ui/core/Checkbox";
import s from './ProfileInfo.module.css'
import styles from "../../../Common/FormsControls/FormsControls.module.css";


const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div><Button variant="outlined">Save</Button></div>
        {error && <div className={styles.formSummaryError}>
            {error}
        </div>}
        <div>
            <b>Full name</b>: {createField("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>:  {createField("", "lookingForAJob", [], Input, {type: Checkbox})}
        </div>
        <div>
            <b>My proffesional skills</b>:
            {createField("", "lookingForAJobDescription", [], Textarea)}
        </div>
        }

        <div>
            <b>About me</b>:
            {createField("About Me", "aboutMe", [], Textarea )}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}:{createField(key, "contacts." + key, [], Input)}</b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;
