

import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

const conta = require('../imgs/carteira.png');

export default class ItensConta extends Component {
  render() {
    return (
      <View style={styles.principal}>
        
        <View style={styles.detalhes2}>
          <Text style={styles.titulo}>{this.props.data.titulo}</Text>
          
        </View>
        <View style={styles.detalhes}>
          <Text style={styles.valor}>SALDO: R$ {this.props.data.saldo}</Text>
         
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

    fontWeight: 'bold'
  },
  detalhes: {
    flex: 5,
    marginLeft: 15,
    alignItems: 'center',
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
  fontes:{
    fontSize: 14
  },
  icone:{
    flex: 1,
    justifyContent: 'center',
    marginRight:20
  }

});