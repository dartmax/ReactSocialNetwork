import React, {FC} from "react";
import {Button} from "antd";
import {createField, GetStringKeys, Input, Textarea} from "../../../Common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import Checkbox from "@material-ui/core/Checkbox";
import s from './ProfileInfo.module.css'
import styles from "../../../Common/FormsControls/FormsControls.module.css";
import {ProfileType} from "../../../types/types";

type PropsType = {
  profile: ProfileType
}

type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
  return <form onSubmit={handleSubmit}>
    <div><Button onClick={handleSubmit}>Save</Button></div>
    {error && <div className={styles.formSummaryError}>
      {error}
    </div>}
    <div>
      <b>Full name</b>: {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
    </div>
    <div>
      <b>Looking for a job</b>: {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {type: Checkbox})}
    </div>
    <div>
      <b>My proffesional skills</b>:
      {createField<ProfileTypeKeys>("", "lookingForAJobDescription", [], Textarea)}
    </div>
    }

    <div>
      <b>About me</b>:
      {createField<ProfileTypeKeys>("About Me", "aboutMe", [], Textarea)}
    </div>
    <div>
      <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
      return <div key={key} className={s.contact}>
        {/*TODO: Create some solution for embedded obj*/}
        <b>{key}:{createField(key, "contacts." + key, [], Input)}</b>
      </div>
    })}
    </div>
  </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;
