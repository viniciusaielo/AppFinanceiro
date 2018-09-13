import { combineReducers } from 'redux';
import EventoReducer from './EventoReducer';
import AppReducer from './AppReducer';
import ContaReducer from './ContaReducer';
import ListaReceitasReducer from './ListaReceitasReducer';
import ListaDespesasReducer from './ListaDespesasReducer';
import ListaContaReducer from './ListaContaReducer';
export default combineReducers({
	EventoReducer: EventoReducer,
	ContaReducer: ContaReducer,
	AppReducer: AppReducer,
	ListaReceitasReducer,
	ListaDespesasReducer,
	ListaContaReducer
});