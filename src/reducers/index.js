import { combineReducers } from 'redux';
import EventoReducer from './EventoReducer';
import AppReducer from './AppReducer';
import ContaReducer from './ContaReducer';

export default combineReducers({
	EventoReducer: EventoReducer,
	ContaReducer: ContaReducer,
	AppReducer: AppReducer
});