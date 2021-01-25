import React, {FC, useEffect, useState} from "react";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

const ChatPage: FC = () => {
  return <div>
    <Chat />
  </div>
}

const Chat: FC = () => {
  return <div>
    <Messages />
    <AddMessageForm />
  </div>
}

const Messages: FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  useEffect(() => {
    ws.addEventListener('message', (e: MessageEvent) => {
      const newMesseges = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMesseges]);
    })
  }, []);

  return <div style={{ height: "400px", overflowY: "auto"}}>
    {messages.map((m, index) => <Message key={index} message={m}/>)}
  </div>
}

const Message: FC<{message: ChatMessageType}> = ({message}) => {
  return <div>
    <img src={message.photo} style={{width: "30px", borderRadius: "30px"}} alt={message.userId.toString()}/> <b>{message.userName}</b>
    <br/>
    {message.message}
    <hr/>
  </div>
}

const AddMessageForm: FC = () => {
  const [message, setMessage] = useState('')
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
  useEffect(() => {
    ws.addEventListener('open', () =>{
      setReadyStatus('ready')
    })
  })

  const sendMessage = () => {
    if(!message) {
      return;
    }
    ws.send(message);
    setMessage('');
  }

  return <div>
    <div>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
    </div>
    <div>
      <button disabled={readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
    </div>
  </div>
}


export default ChatPage;
