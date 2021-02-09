import {FormAction} from 'redux-form';
import {BaseThunkType, InferActionsTypes} from './redux-store';
import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";
import {v1} from 'uuid';

const MESSAGES_RECEIVED = 'samurai-network/chat/MESSAGES_RECEIVED';
const STATUS_WS_CHANGED = 'samurai-network/chat/STATUS_WS_CHANGED';

type ChatMessageType = ChatMessageAPIType & {id: string}

let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
};

const chatReducer = (state = initialState, action: ActionsType): initialStateType => {
  switch (action.type){
    case MESSAGES_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1()}))].filter((m, i, arr) => i >= arr.length - 100),
      }
    case STATUS_WS_CHANGED:
      return {
        ...state,
        status: action.payload.status,
      }
    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: ChatMessageAPIType[]) => ({
    type: MESSAGES_RECEIVED,
    payload: {messages}
  } as const),
  statusWsChanged: (status: StatusType) => ({
    type: STATUS_WS_CHANGED,
    payload: {status}
  } as const)
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _newMessageHandler;
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusWsChanged(status))
    }
  }
  return _statusChangedHandler;
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
  chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message);
}

export default chatReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>