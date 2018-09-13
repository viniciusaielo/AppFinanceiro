
import { LISTA_CARTAO_USUARIO } from '../actions/types'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case LISTA_CARTAO_USUARIO:
            return action.payload
        default:
            return state;
    }
}