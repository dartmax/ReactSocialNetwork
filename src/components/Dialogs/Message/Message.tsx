import React, {FC} from "react";
import s from './../Dialogs.module.css'

type PropsType = {
    message: string
}

const Message: FC<PropsType> = (props) => {
    return <div className={s.dialog}>{props.message}</div>
}


export default Message;
