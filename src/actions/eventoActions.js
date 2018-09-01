import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
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

   
} from './types';

export const modificaValor = (texto) => {
    return {
        type: MODIFICA_VALOR,
        payload: texto
    }
}

export const modificaData = (texto) => {
    return {
        type: MODIFICA_DATA,
        payload: texto
    }
}

export const modificaDesc = (texto) => {
    return {
        type: MODIFICA_DESC,
        payload: texto
    }
}

export const modificaCat = (texto) => {
    return {
        type: MODIFICA_CAT,
        payload: texto
    }
}
export const modificaConta = (texto) => {
    return {
        type: MODIFICA_CONTA,
        payload: texto
    }
}

export const modificaValorD = (texto) => {
    return {
        type: MODIFICA_VALORD,
        payload: texto
    }
}

export const modificaDataD = (texto) => {
    return {
        type: MODIFICA_DATAD,
        payload: texto
    }
}

export const modificaDescD = (texto) => {
    return {
        type: MODIFICA_DESCD,
        payload: texto
    }
}

export const modificaCatD = (texto) => {
    return {
        type: MODIFICA_CATD,
        payload: texto
    }
}
export const modificaContaD = (texto) => {
    return {
        type: MODIFICA_CONTAD,
        payload: texto
    }
}
export const checked = (texto) => {
    return {
        type: CHECKED,
        payload: texto
    }
}
export const checkedD = (texto) => {
    return {
        type: CHECKEDD,
        payload: texto
    }
}



export const enviaReceita = ({valor,data,desc,cat,conta}) => {

    return dispatch => {  
        firebase.database().ref(`/receita/data`)
        .push({data,cat, valor, desc, conta })
        .then(alert("Receita Salva"))
        .catch(erro => console.log(erro.message, dispatch))
    }
}



export const enviaDespesa = ({valor,data,desc,cat,conta}) => {

    return dispatch => {
         firebase.database().ref(`/despesa/${cat}/${data}`)
        .set({data, valor, desc, conta })
        .then(alert("Despesa Salva"))
        .catch(erro => console.log(erro.message, dispatch))
    }
}
var lista = [];

export const consultaReceita = () => {
   
     return dispatch => {
        firebase.database().ref('/receita/data').on('value',function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                lista.push(item);
            });
            return {
    
        type: CONSULTA_RECEITA,
        payload: lista
    }
            
            })
    }
}


const carregou = () =>{
    alert("carregou");
    mostra();
     return {
        type: CARREGOU,
        payload: true
    }
}
const mostra = () => {
    alert(lista)
    return {
        type: CONSULTA_RECEITA,
        payload: lista
    }
}
/*export const consultaReceita = () => {
   firebase.database().ref('/receita/data').on('value', function(snapshot) {lista = snapshotToArray(snapshot);});
    return {
        type: CONSULTA_RECEITA,
        payload: lista
    }
}

const snapshotToArray = (snapshot) => {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        returnArr.push(item);
    });

    return returnArr;
}
const carregou = () =>{
     return {
        type: CARREGOU,
        payload: true
    }
}*/









/*const cadastroUsuarioSucesso = (dispatch) => {
    dispatch ({ type: CADASTRO_USUARIO_SUCESSO });

    Actions.boasVindas();
}

const cadastroUsuarioErro = (erro, dispatch) => {
    dispatch ({ type: CADASTRO_USUARIO_ERRO, payload: erro.message });
}

export const autenticarUsuario = ({ email, senha }) => {

    return dispatch => {

        dispatch({ type: LOGIN });

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(value => loginUsuarioSucesso(dispatch))
            .catch(erro => loginUsuarioErro(erro, dispatch));
    }
}

const loginUsuarioSucesso = (dispatch) => {
    dispatch (
        {
            type: LOGIN_USUARIO_SUCESSO
        }
    );

    Actions.principal();
}

const loginUsuarioErro = (erro, dispatch) => {
    dispatch (
        {
            type: LOGIN_USUARIO_ERRO,
            payload: erro.message
        }
    );
} */