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
    LISTA_RECEITA_USUARIO,
    LISTA_DESPESA_USUARIO

   
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
   
    const d = new Date(data)
    
    const ano = d.getFullYear()
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const mes =  months[d.getMonth()];
    return dispatch => {  
        firebase.database().ref(`/receita/data/${ano}/${mes}`)
        .push({data,cat, valor, desc, conta })
        .then(alert("Receita Salva"))
        .catch(erro => console.log(erro.message, dispatch))
    }
}



export const enviaDespesa = ({valor,data,desc,cat,conta}) => {
    const d = new Date(data)
    
    const ano = d.getFullYear()
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const mes =  months[d.getMonth()];

    return dispatch => {
         firebase.database().ref(`/despesa/data/${ano}/${mes}`)
        .push({data,cat, valor, desc, conta })
        .then(alert("Despesa Salva"))
        .catch(erro => console.log(erro.message, dispatch))
    }
}


export const consultaReceita = (data) => {
    const d = new Date(data)
    const ano = d.getFullYear()
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const mes =  months[d.getMonth() ];

    return (dispatch) => {
      
        firebase.database().ref(`/receita/data/${ano}/${mes}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_RECEITA_USUARIO, payload: snapshot.val() })
            })
    }  
}

export const consultaData = (receitas, datai, dataf) => {
    let ordena = receitas;
    let ordenado = [];
    var i;
    var dataI = new Date(datai);
    var dataF = new Date(dataf);
    var data;
    for( i = 0; i < ordena.length ; i++){
        data = new Date(ordena[i].data)
        if(data >= dataI && data <= dataF ){
            ordenado.push(ordena[i]); 
        }
    }
    console.log('aqui')
    console.log(ordenado)
     return {
        type: LISTA_RECEITA_USUARIO,
        payload: ordenado
    }

}
export const consultaDataD = (despesas, datai, dataf) => {
    let ordena = despesas;
    console.log(despesas)
    let ordenado = [];
    var i;
    console.log(datai)
    console.log(dataf)
    var dataI = new Date(datai);
    var dataF = new Date(dataf);
    var data;
    for( i = 0; i < ordena.length ; i++){
        data = new Date(ordena[i].data)
        if(data >= dataI && data <= dataF ){
            ordenado.push(ordena[i]); 
        }
    }
    console.log('aqui')
    console.log(ordenado)
     return {
        type:  LISTA_DESPESA_USUARIO,
        payload: ordenado
    }

}

export const consultaDespesa = (data) => {
    const d = new Date(data)
    const ano = d.getFullYear()
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const mes =  months[d.getMonth() ];

    return (dispatch) => {
      

        firebase.database().ref(`/despesa/data/${ano}/${mes}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_DESPESA_USUARIO, payload: snapshot.val() })
            })
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