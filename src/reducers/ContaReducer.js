import { 
    CONTA_SALDO,
    CONTA_TITULO,
    LIMITE,
    VENCIMENTO,
    CARTAO_DESC,
    FECHAMENTO,
    DISPONIVEL,
    BANDEIRA,
    MODIFICA_CONTA_CARTAO
   
} from '../actions/types';

const INITIAL_STATE = {
    titulo: '',
    saldo:'',
    limite: '',
    dispo: '',
    fec: '',
    venc: '',
    desc: '',
    bandeira: '',
    conta_cartao: '',
    contas: ['Bradesco', 'Carteira']
}

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch(action.type) {
        case CONTA_SALDO:
            return { ...state, saldo: action.payload }
        case CONTA_TITULO:
            return { ...state, titulo: action.payload }
        case LIMITE:
            return { ...state, limite: action.payload }
        case DISPONIVEL:
            return { ...state, dispo: action.payload }
        case FECHAMENTO:
            return { ...state, fec: action.payload }
        case VENCIMENTO:
            return { ...state, venc: action.payload }
        case CARTAO_DESC:
            return { ...state, desc: action.payload }
        case BANDEIRA:
            return { ...state, bandeira: action.payload }
        case MODIFICA_CONTA_CARTAO:
            return { ...state, conta_cartao: action.payload }
        default:
            return state;
    }    
}