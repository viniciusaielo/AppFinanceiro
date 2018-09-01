import { 
    MODIFICA_VALOR,
    MODIFICA_DATA,
    MODIFICA_DESC,
    MODIFICA_CAT,
    MODIFICA_CONTA,
    MODIFICA_VALORD,
    MODIFICA_DATAD,
    MODIFICA_DESCD,
    MODIFICA_CATD,
    MODIFICA_CONTAD,
    CHECKED,
    CHECKEDD,
    CONSULTA_RECEITA,
    CARREGOU
   
} from '../actions/types';

const INITIAL_STATE = {
    valor: '',
    data: '15-05-2016',
    desc: '',
    cat: 'Salario',
    conta: 'Carteira',
    valorD: '',
    dataD: '15-05-2016',
    descD: '',
    catD: 'Alimentacao',
    contaD: 'Carteira',
    verificado: 'Não',
    verificadoD: 'Não',
    listaItens: [],
    carregar: false
}

export default (state = INITIAL_STATE, action) => {
    console.log();
    switch(action.type) {
        case MODIFICA_VALOR:
            return { ...state, valor: action.payload }
        case MODIFICA_DATA:
            return { ...state, data: action.payload }
        case MODIFICA_DESC:
            return { ...state, desc: action.payload }
        case MODIFICA_CAT:
            return { ...state, cat: action.payload }
        case MODIFICA_CONTA:
            return { ...state, conta: action.payload }
        case MODIFICA_VALORD:
            return { ...state, valorD: action.payload }
        case MODIFICA_DATAD:
            return { ...state, dataD: action.payload }
        case MODIFICA_DESCD:
            return { ...state, descD: action.payload }
        case MODIFICA_CATD:
            return { ...state, catD: action.payload }
        case MODIFICA_CONTAD:
            return { ...state, contaD: action.payload }
        case CHECKED:
             return { ...state, verificado: action.payload}
        case CHECKEDD:
             return { ...state, verificadoD: action.payload}
        case CONSULTA_RECEITA:
            alert(listaItens)
            return{...state, listaItens: action.payload}
        case CARREGOU:
            return{...state, carregar: payload}
       
        default:
            return state;
    }    
}