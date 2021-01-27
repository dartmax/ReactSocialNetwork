import {FormAction} from 'redux-form';
import {BaseThunkType, InferActionsTypes} from './redux-store';
import {chatAPI, ChatMessageType} from "../api/chat-api";
import {Dispatch} from "redux";
import {message} from "antd";

const MESSAGES_RECEIVED = 'samurai-network/chat/MESSAGES_RECEIVED';


let initialState = {
  messages: [] as ChatMessageType[],
};

const chatReducer = (state = initialState, action: ActionsType): initialStateType => {
  switch (action.type){
    case MESSAGES_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      }
    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) => ({
    type: MESSAGES_RECEIVED,
    payload: {messages}
  } as const)
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _newMessageHandler;
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
  chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message);
}

export default chatReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>