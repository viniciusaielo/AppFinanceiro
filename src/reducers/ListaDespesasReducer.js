import { LISTA_DESPESA_USUARIO } from '../actions/types'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case LISTA_DESPESA_USUARIO:
            return action.payload
        default:
            return state;
    }
}