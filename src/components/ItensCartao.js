

import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

const cartao = require('../imgs/cartao.png');

export default class ItensCartao extends Component {
  render() {
    const data = new Date();
    const vencimento =  (data.getMonth()+1) +'-' + this.props.data.venc +  '-' + data.getFullYear()
    const fechamento =  (data.getMonth()+1) +'-' + this.props.data.fec +  '-' + data.getFullYear()
    return (
      <View style={styles.principal}>
        <View style={styles.detalhes2}>
          <Image style = {{height: 50, width: 50}}source ={cartao}/>
          <Text style={styles.titulo}>{this.props.data.bandeira}</Text>
        </View>
        <View style={styles.detalhes}>
          <Text style={styles.dispo}>Saldo Disponivel: R$ {this.props.data.dispo}</Text>
          <Text style={styles.limite}>Limite: R$ {this.props.data.limite}</Text>            
          <Text style={styles.valor}>Vencimento: {vencimento}</Text>
          <Text style={styles.valor}>Fechamento: {fechamento}</Text>         
        </View>
        <View style={styles.icone}>
          <Icon name='edit' containerStyle={{width: 100, height: 30,backgroundColor: '#fff'}}  color="#4169E1" 
             >
          </Icon>
        </View>
      </View>

    );
  }
}

const styles= StyleSheet.create({
  principal:{
    borderWidth: 0.5,
    borderColor:  '#999',
    margin: 5,
    padding: 10,
    flexDirection: 'row'
  },
  foto:{
    marginRight: 10
  },
  titulo: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginLeft:10
  },
  detalhes: {
    flex: 5,
    marginLeft: -60,
    justifyContent: 'center'
  }, 
  detalhes2: {
    flex: 3,
    justifyContent: 'center'
  }, 
  valor:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  dispo:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#008B8B'
  },
  limite:{
    fontSize: 18,
    fontWeight: 'bold',
    color:'#FF8C00'
  },
  fontes:{
    fontSize: 14
  },
  icone:{
    flex: 1,
    justifyContent: 'center',
    marginLeft:-80

  }

});