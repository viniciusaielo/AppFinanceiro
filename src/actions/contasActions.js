import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
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
} from './types';

export const modificaTitulo = (texto) => {
    return { 
        type: CONTA_TITULO,
        payload: texto
    }
}

export const modificaSaldo = (texto) => {
    return {
        type: CONTA_SALDO,
        payload: texto
    }
}
export const modificaLimite = (texto) => {
    return { 
        type: LIMITE,
        payload: texto
    }
}

export const modificaDispo = (texto) => {
    return {
        type: DISPONIVEL,
        payload: texto
    }
}
export const modificaDesc = (texto) => {
    return { 
        type: CARTAO_DESC,
        payload: texto
    }
}

export const modificaFec = (texto) => {
    return {
        type: FECHAMENTO,
        payload: texto
    }
}
export const modificaVenc = (texto) => {
    return { 
        type: VENCIMENTO,
        payload: texto
    }
}
export const modificaBandeira = (texto) => {
    return {
        type: BANDEIRA,
        payload: texto
    }
}
export const modificaConta = (texto) => {
    return { 
        type: MODIFICA_CONTA_CARTAO,
        payload: texto
    }
}




export const enviaConta = ({titulo,saldo}) => {

        return dispatch => {
            
            firebase.database().ref(`/conta/${titulo}`)
            .push({saldo})
            .then(alert("Conta Salva"))
            .catch(erro => console.log(erro.message, dispatch))
        }


            

}
export const enviaCartao = ({limite,dispo,desc,venc,fec,bandeira,conta}) => {

    return dispatch => {
         
        firebase.database().ref(`/cartao/${bandeira}/${conta}`)
        .push({desc,limite, dispo,venc, fec})
        .then(alert("Cartão Salvo"))
        .catch(erro => alert(erro.message, dispatch))



    }
    

}
